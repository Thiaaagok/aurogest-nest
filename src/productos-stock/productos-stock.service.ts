import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductosStockDto } from './dto/create-productos-stock.dto';
import { UpdateProductosStockDto } from './dto/update-productos-stock.dto';
import { BaseService } from 'src/base/base.service';
import { ProductoStock } from './entities/productos-stock.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ProductosService } from 'src/productos/productos.service';

@Injectable()
export class ProductosStockService extends BaseService<ProductoStock, CreateProductosStockDto, UpdateProductosStockDto> {
  productoService: ProductosService;
  constructor(
    @InjectRepository(ProductoStock)
    productosStockRepo: Repository<ProductoStock>,
    productoService: ProductosService
  ) {
    super(productosStockRepo, 'ProductosStock');
    this.productoService = productoService;
  }

  public async reactivar(id: string): Promise<ProductoStock> {
    const entity = await this.repository.findOne({
      where: { Id: id } as FindOptionsWhere<ProductoStock>,
    });

    if (!entity) {
      throw new NotFoundException(`El id ${id} no fue encontrado`);
    }

    entity.Activo = true;

    return this.repository.save(entity);
  }

  public async eliminar(id: string): Promise<ProductoStock> {
    const entity = await this.repository.findOne({
      where: { Id: id } as FindOptionsWhere<ProductoStock>,
    });

    if (!entity) {
      throw new NotFoundException(`El id ${id} no fue encontrado`);
    }

    entity.Activo = false;

    return this.repository.save(entity);
  }

  public async obtenerPorCodigoBarra(codigoBarra: string): Promise<ProductoStock> {
    const producto = this.productoService.obtenerPorCodioBarra(codigoBarra)
    const entity = await this.repository.findOne({
      where: { CodigoBarra: codigoBarra } as FindOptionsWhere<ProductoStock>,
    });

    if (!entity) {
      throw new NotFoundException(`El producto con el código de barra (${codigoBarra}) no fue encontrado`);
    }
    return entity;
  }
}
