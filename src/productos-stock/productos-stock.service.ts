import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CrearProductosStockDto } from './dto/create-productos-stock.dto';
import { UpdateProductosStockDto } from './dto/update-productos-stock.dto';
import { BaseService } from 'src/base/base.service';
import { ProductoStock, ProductoStockLote } from './entities/productos-stock.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, FindOptionsWhere, Repository } from 'typeorm';
import { ProductosService } from 'src/productos/productos.service';

@Injectable()
export class ProductosStockService extends BaseService<ProductoStock, CrearProductosStockDto, UpdateProductosStockDto> {
  constructor(
    @InjectRepository(ProductoStock)
    productosStockRepo: Repository<ProductoStock>,
    @Inject(forwardRef(() => ProductosService))
    private readonly productoService: ProductosService
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
    const producto = this.productoService.obtenerPorCodigoBarra(codigoBarra)
    const entity = await this.repository.findOne({
      where: { CodigoBarra: codigoBarra } as FindOptionsWhere<ProductoStock>,
    });

    if (!entity) {
      throw new NotFoundException(`El producto con el código de barra (${codigoBarra}) no fue encontrado`);
    }
    return entity;
  }

  async aumentarStock(id: string, loteAumentar: ProductoStockLote, manager?: EntityManager): Promise<ProductoStock> {
    const repo = manager ? manager.getRepository(ProductoStock) : this.repository;

    const entity = await repo.findOne({
      where: { Id: id } as FindOptionsWhere<ProductoStock>,
      relations: ['Lotes'],
    });

    if (!entity) {
      throw new NotFoundException(`El producto stock no fue encontrado`);
    }

    // Actualizar Stock
    if (!entity.Lotes) {
      entity.Lotes = [];
    }
    entity.Lotes.push(loteAumentar);
    entity.StockActualTotal += loteAumentar.CantidadInicial;
    entity.UltimaActualizacion = loteAumentar.FechaIngreso;

    return await repo.save(entity);
  }

  public async disminuirStock(id: string, stockDisminuir: number): Promise<ProductoStock> {
    const entity = await this.repository.findOne({
      where: { Id: id } as FindOptionsWhere<ProductoStock>,
    });

    if (!entity) {
      throw new NotFoundException(`El producto stock no fue encontrado`);
    }

    entity.StockActualTotal = entity.StockActualTotal - stockDisminuir;
    return this.repository.save(entity);
  }

  public async obtenerStockPorProductoId(productoId: string): Promise<ProductoStock> {
    const entity = await this.repository.findOne({
      where: { Producto: { Id: productoId } } as FindOptionsWhere<ProductoStock>,
      relations: ['Producto'],
    });

    if (!entity) {
      throw new NotFoundException(`No se encontró stock para el producto con id ${productoId}`);
    }

    return entity;
  }
}
