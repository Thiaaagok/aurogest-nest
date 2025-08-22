import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { Producto } from './entities/producto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CrearProductoDto } from './dto/create-producto.dto';
import { EditarProductoDto } from './dto/update-producto.dto';
import { RegistroActualizacionPrecio } from 'src/registros/entities/registro.entity';
import { RegistrosService } from 'src/registros/registros.service';

@Injectable()
export class ProductosService extends BaseService<Producto, CrearProductoDto, EditarProductoDto> {
  constructor(
    @InjectRepository(Producto)
    productosRepo: Repository<Producto>,
    private readonly registrosService: RegistrosService,
  ) {
    super(productosRepo, 'Productos');
  }

  public async reactivar(id: string): Promise<Producto> {
    const entity = await this.repository.findOne({
      where: { Id: id } as FindOptionsWhere<Producto>,
    });

    if (!entity) {
      throw new NotFoundException(`El id ${id} no fue encontrado`);
    }

    entity.Activo = true;

    return this.repository.save(entity);
  }

  public async eliminar(id: string): Promise<Producto> {
    const entity = await this.repository.findOne({
      where: { Id: id } as FindOptionsWhere<Producto>,
    });

    if (!entity) {
      throw new NotFoundException(`El id ${id} no fue encontrado`);
    }

    entity.Activo = false;

    return this.repository.save(entity);
  }

  public async obtenerPorCodigoBarra(codigoBarra: string): Promise<Producto> {
    const entity = await this.repository.findOneBy({ CodigoBarra: codigoBarra } as any);
    if (!entity) {
      throw new NotFoundException(`Producto con codigo de barra ${codigoBarra} no fue encontrado`);
    }
    return entity;
  }

  public async editarPrecio(nuevoPrecio: number, id: string, tipo: 'COMPRA' | 'VENTA') {
    const producto = await this.repository.findOne({
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

    return this.repository.save(producto);
  }
}
