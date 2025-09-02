import { BadRequestException, forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { Producto } from './entities/producto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { CrearProductoDto } from './dto/create-producto.dto';
import { EditarProductoDto } from './dto/update-producto.dto';
import { RegistroActualizacionPrecio } from 'src/registros/entities/registro.entity';
import { RegistrosService } from 'src/registros/registros.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { v4 as uuidv4 } from 'uuid';
import { ProductosStockService } from '../productos-stock/productos-stock.service';
import { CrearProductosStockDto } from 'src/productos-stock/dto/create-productos-stock.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    protected readonly productosRepo: Repository<Producto>,
    private readonly registrosService: RegistrosService,
    private readonly usuariosService: UsuariosService,
    @Inject(forwardRef(() => ProductosStockService))
    private readonly productosStockService: ProductosStockService,
  ) {

  }

  public obtenerTodos() {
    return this.productosRepo.find({});
  }

  public async obtenerPorId(id: string): Promise<Producto> {
    const entity = await this.productosRepo.findOneBy({ Id: id } as any);
    if (!entity) {
      throw new NotFoundException(`$Producto con id ${id} no fue encontrado`);
    }
    return entity;
  }

  public async reactivar(id: string): Promise<Producto> {
    const entity = await this.productosRepo.findOne({
      where: { Id: id } as FindOptionsWhere<Producto>,
    });

    if (!entity) {
      throw new NotFoundException(`El id ${id} no fue encontrado`);
    }

    entity.Activo = true;

    return this.productosRepo.save(entity);
  }

  public async eliminar(id: string): Promise<Producto> {
    const entity = await this.productosRepo.findOne({
      where: { Id: id } as FindOptionsWhere<Producto>,
    });

    if (!entity) {
      throw new NotFoundException(`El id ${id} no fue encontrado`);
    }

    entity.Activo = false;

    return this.productosRepo.save(entity);
  }

  public async obtenerPorCodigoBarra(codigoBarra: string): Promise<Producto> {
    const entity = await this.productosRepo.findOneBy({ CodigoBarra: codigoBarra } as any);
    if (!entity) {
      throw new NotFoundException(`Producto con codigo de barra ${codigoBarra} no fue encontrado`);
    }
    return entity;
  }

  public async editarPrecio(nuevoPrecio: number, id: string, tipo: 'COMPRA' | 'VENTA') {
    const producto = await this.productosRepo.findOne({
      where: { Id: id } as FindOptionsWhere<Producto>,
    });

    if (!producto) {
      throw new NotFoundException(`El id ${id} no fue encontrado`);
    }

    const registro: RegistroActualizacionPrecio = new RegistroActualizacionPrecio();
    registro.Producto = producto;

    if (tipo === 'COMPRA') {
      registro.PrecioAnterior = producto.PrecioCompra;
      registro.PrecioNuevo = nuevoPrecio;
      registro.Porcentaje = producto.PrecioCompra === 0 ? 0 : ((nuevoPrecio - producto.PrecioCompra) / producto.PrecioCompra) * 100;

      producto.PrecioCompra = nuevoPrecio;
      await this.registrosService.registrarEdicionPrecioCompra(registro);
    } else if (tipo === 'VENTA') {
      registro.PrecioAnterior = producto.PrecioVenta;
      registro.PrecioNuevo = nuevoPrecio;
      registro.Porcentaje = producto.PrecioVenta === 0 ? 0 : ((nuevoPrecio - producto.PrecioVenta) / producto.PrecioVenta) * 100;

      producto.PrecioVenta = nuevoPrecio;
      await this.registrosService.registrarEdicionPrecioVenta(registro);
    } else {
      throw new BadRequestException('Tipo debe ser COMPRA o VENTA');
    }

    return this.productosRepo.save(producto);
  }

  public async crear(dto: CrearProductoDto, UsuarioId: string): Promise<Producto> {
    try {
      /* const usuario = await this.usuariosService.obtenerPorId(UsuarioId);
      if (!usuario) {
        throw new BadRequestException('Usuario no encontrado');
      } */

      const entity = this.productosRepo.create({
        ...dto,
      } as DeepPartial<Producto>);

      (entity as any).Id = uuidv4();
      (entity as any).Activo = true;

      const response = await this.productosRepo.save(entity);

      if (response) {
        const dtoStock = new CrearProductosStockDto();
        dtoStock.StockActualTotal = 0;
        dtoStock.Producto = response;

        await this.productosStockService.crear(dtoStock);
      }

      return response;
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException(error.detail);
      }
      console.error(error);
      throw new InternalServerErrorException('Error inesperado, revisar el servicio de productos');
    }
  }

  public async editar(dto: EditarProductoDto, id: string): Promise<Producto> {
    const entity = await this.productosRepo.preload({
      Id: id,
      ...dto,
    } as DeepPartial<Producto>);

    if (!entity) {
      throw new NotFoundException(`Producto con el id ${id} no fue encontrado`);
    }

    return this.productosRepo.save(entity);
  }

}
