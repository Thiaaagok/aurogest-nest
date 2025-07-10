import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { ProductoTipo } from './entities/productos-tipo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { EditarProductoTipoDto } from './dto/update-productos-tipo.dto';
import { CrearProductoTipoDto } from './dto/create-productos-tipo.dto';

@Injectable()
export class ProductosTiposService {

  protected readonly logger: Logger;
  protected readonly entityName: string = "tipoProducto";

  constructor(
    @InjectRepository(ProductoTipo)
    protected readonly tipoProductoRepo: Repository<ProductoTipo>,
  ) {
    this.logger = new Logger(`TipoProductoService`);
  }

  public async reactivar(id: string): Promise<ProductoTipo> {
    const entity = await this.tipoProductoRepo.findOne({
      where: { Id: id } as FindOptionsWhere<ProductoTipo>,
  });

  if (!entity) {
      throw new NotFoundException(`El id ${id} no fue encontrado`);
  }

  entity.Activo = true;

  return this.tipoProductoRepo.save(entity);
  }

  public async eliminar(id: string): Promise<ProductoTipo> {
      const entity = await this.tipoProductoRepo.findOne({
          where: { Id: id } as FindOptionsWhere<ProductoTipo>,
      });
  
      if (!entity) {
          throw new NotFoundException(`El id ${id} no fue encontrado`);
      }
  
      entity.Activo = false;
  
      return this.tipoProductoRepo.save(entity);
  }

    public obtenerTodos() {
      return this.tipoProductoRepo.find({});
  }

  public async obtenerPorId(id: string): Promise<ProductoTipo> {
    const entity = await this.tipoProductoRepo.findOneBy({ Id: id } as any);
    if (!entity) {
        throw new NotFoundException(`${this.entityName} con id ${id} no fue encontrado`);
    }
    return entity;
  }

  public async editar(dto: EditarProductoTipoDto, id: string): Promise<ProductoTipo> {
    const entity = await this.tipoProductoRepo.preload({
        Id: id,
        ...dto,
    } as DeepPartial<ProductoTipo>);

    if (!entity) {
        throw new NotFoundException(`${this.entityName} con el id ${id} no fue encontrado`);
    }

    return this.tipoProductoRepo.save(entity);
  }

  public async crear(dto: CrearProductoTipoDto): Promise<ProductoTipo> {
    try {
      const entity = this.tipoProductoRepo.create(dto as DeepPartial<ProductoTipo>);
      (entity as any).Id = uuidv4();
      (entity as any).Activo = true;
      return await this.tipoProductoRepo.save(entity);
    } catch (error) {
      if (error.code === '23505') {
          throw new BadRequestException(error.detail);
      }
      this.logger.error(error);
      throw new InternalServerErrorException('Unexpected error, check server logs');
    }
  }
}
