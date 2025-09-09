import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { Compra, CompraItem } from './entities/compra.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CompraCreateDto } from './dto/create-compra.dto';
import { v4 as uuidv4 } from 'uuid';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { ProductosStockService } from 'src/productos-stock/productos-stock.service';
import { ProductoStockLote } from 'src/productos-stock/entities/productos-stock.entity';
const PDFDocument = require('pdfkit-table');
const { ThermalPrinter, PrinterTypes, CharacterSet, BreakLine } = require('node-thermal-printer');


@Injectable()
export class ComprasService {
  protected readonly logger: Logger;
  protected readonly entityName: string = "Compra";

  constructor(
    @InjectRepository(Compra)
    protected readonly comprasRepo: Repository<Compra>,
    private readonly dataSource: DataSource,
    private readonly usuariosService: UsuariosService,
    private readonly stockService: ProductosStockService
  ) {
    this.logger = new Logger(`compraService`);
  }

  public obtenerTodos() {
    return this.comprasRepo.find({
      relations: ['Usuario', 'Items', 'Items.Producto'],
    });
  }

  public async obtenerPorId(id: string): Promise<Compra> {
    const entity = await this.comprasRepo.findOneBy({ Id: id } as any);
    if (!entity) {
      throw new NotFoundException(`${this.entityName} con id ${id} no fue encontrado`);
    }
    return entity;
  }

  public async crear(dto: CompraCreateDto): Promise<Compra> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Obtener el usuario
      const usuario = await this.usuariosService.obtenerPorId(dto.UsuarioId);
      if (!usuario) {
        throw new BadRequestException('Usuario no encontrado');
      }

      // 2. Crear la compra
      const compra = this.comprasRepo.create({
        ...dto,
        Usuario: usuario,
      } as DeepPartial<Compra>);
      (compra as any).Id = uuidv4();
      (compra as any).Activo = true;

      const nuevaCompra = await queryRunner.manager.save(compra);

      // 3. Actualizar stock de cada item
      for (const item of dto.Items) {
        const stock = await this.stockService.obtenerStockPorProductoId(item.Producto.Id);
        if (!stock) {
          throw new BadRequestException(`Stock no encontrado para el producto ${item.Producto.Id}`);
        }

        const nuevoLote: ProductoStockLote = {
          Id: uuidv4(),
          PrecioUnitario: item.Producto.PrecioCompra,
          CantidadInicial: item.Cantidad,
          CantidadActual: item.Cantidad,
          FechaIngreso: dto.Fecha,
          ProductoStock: stock
        };

        await this.stockService.aumentarStock(stock.Id, nuevoLote, queryRunner.manager);
      }

      // 4. Confirmar transacción
      await queryRunner.commitTransaction();
      return nuevaCompra;

    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error.code === '23505') {
        throw new BadRequestException(error.detail);
      }
      console.error(error);
      throw new InternalServerErrorException('Error inesperado, revisar el servicio de logs');
    } finally {
      await queryRunner.release();
    }
  }

  async generarRemito(compra: Compra): Promise<Buffer> {
    const pdfbuffer: Buffer = await new Promise(resolve => {
      const documento = new PDFDocument({
        size: [226.77, 600],
        margin: 10,
        bufferPages: true
      }
      )


      documento.fontSize(20).text('Remito', { align: 'center' });
      documento.moveDown();

      documento.fontSize(12).text(`ID Compra: ${compra.Id}`);
      documento.text(`Fecha: ${new Date(compra.Fecha).toLocaleDateString()}`);
      documento.text(`Total: $${Number(compra.Total).toFixed(2)}`);
      documento.moveDown();

      const rows: (string | number)[][] = compra.Items.map((item, index) => [
        index + 1,
        item.Producto?.Descripcion || 'Producto',
        item.Cantidad,
        item.Producto?.PrecioCompra || 0,
        Number(item.Subtotal),
        item?.Proveedor?.Descripcion || 'N/A'
      ]);

      const table = {
        title: 'Lista de productos',
        subtitle: 'Compra de stock',
        headers: ["#", "Producto", "Cantidad", "Precio Unitario", "Subtotal", "Proveedor"],
        rows: rows
      };

      documento.table(table, {
        prepareHeader: () => documento.fontSize(7),
        prepareRow: (row, i) => documento.fontSize(5)
      });

      const buffer = [];
      documento.on('data', buffer.push.bind(buffer));
      documento.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      })

      documento.end();
    })

    return pdfbuffer;
  }

  async imprimirRemitoPOS58(compra: Compra) {
    try {
      let printer = new ThermalPrinter({
        type: 'epson',                                  // Printer type: 'star' or 'epson'
        interface: 'printer:POS58 Printer',                       // Printer interface
        characterSet: CharacterSet.PC437_USA,
        options: {                                                 // Additional options
          timeout: 5000                                           // Connection timeout (ms) [applicable only for network printers] - default: 3000
        }
      });

      printer.alignCenter();
      printer.println('REMITO DE COMPRA');
      printer.newLine();

      printer.alignLeft();
      printer.println(`N° Remito: ${compra.Id}`);
      printer.println(`Fecha: ${new Date(compra.Fecha).toLocaleDateString()}`);
      printer.println(`--------------------------------`);

      compra.Items.forEach((item, index) => {
        const linea = `${(index + 1).toString().padEnd(3)} ` +
          `${item.Producto.Descripcion.padEnd(15).slice(0, 15)} ` +
          `${item.Cantidad.toString().padStart(3)} ` +
          `${item.Producto.PrecioCompra.toString().padStart(5)} ` +
          `${Number(item.Subtotal).toFixed(2).padStart(6)}`;
        printer.println(linea);
      });

      printer.println(`--------------------------------`);
      printer.alignRight();
      printer.println(`TOTAL: $${Number(compra.Total).toFixed(2)}`);
      printer.cut();

      let isConnected = await printer.isPrinterConnected();
      console.log('Impresora conectada', isConnected)

      await printer.execute();

    } catch (error) {
      console.error('Error imprimiendo remito POS58:', error);
      throw error;
    }
  }

  async generarRemito48mm(compra: Compra): Promise<Buffer> {
    const pdfbuffer: Buffer = await new Promise(resolve => {
      const documento = new PDFDocument({
        size: [136, 3401],
        margin: 5,
        bufferPages: true
      });

      // --- Encabezado ---
      documento.fontSize(12).text('REMITO', { align: 'center' });
      documento.moveDown(0.5);

      documento.fontSize(7).text(`ID Compra: ${compra.Id}`);
      documento.text(`Fecha: ${new Date(compra.Fecha).toLocaleDateString()}`);
      documento.text(`Total: $${Number(compra.Total).toFixed(2)}`);
      documento.moveDown(0.5);

      // --- Tabla de productos ---
      const rows: (string | number)[][] = compra.Items.map((item, index) => [
        index + 1,
        item.Producto?.Descripcion || 'Producto',
        item.Cantidad,
        item.Producto?.PrecioCompra || 0,
        Number(item.Subtotal),
        item?.Proveedor?.Descripcion || 'N/A'
      ]);

      const table = {
        title: 'Lista de productos',
        subtitle: 'Compra de stock',
        headers: ["#", "Producto", "Cant.", "P.Unit", "Subtotal", "Proveedor"],
        rows: rows
      };

      documento.table(table, {
        prepareHeader: () => documento.fontSize(6),
        prepareRow: (row, i) => documento.fontSize(5),
        width: 130
      });

      const buffer: Buffer[] = [];
      documento.on('data', buffer.push.bind(buffer));
      documento.on('end', () => resolve(Buffer.concat(buffer)));

      documento.end();
    });

    return pdfbuffer;
  }

  async buscarCompras(filtros: {
    fechaDesde?: string;
    fechaHasta?: string;
    usuarioId?: string;
    productoId?: string;
  }) {
    const { fechaDesde, fechaHasta, usuarioId, productoId } = filtros;

    const query = this.comprasRepo
      .createQueryBuilder('compra')
      .leftJoinAndSelect('compra.Usuario', 'usuario')
      .leftJoinAndSelect('compra.Items', 'items')
      .leftJoinAndSelect('items.Producto', 'producto');


    if (fechaDesde && fechaHasta) {
      query.andWhere('compra.Fecha BETWEEN :fechaDesde AND :fechaHasta', {
        fechaDesde,
        fechaHasta,
      });
    }

    if (usuarioId) {
      query.andWhere('usuario.Id = :usuarioId', { usuarioId });
    }

    if (productoId) {
      query.andWhere('producto.Id = :productoId', { productoId });
    }

    return query.getMany();
  }
}
