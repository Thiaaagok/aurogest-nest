import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { Producto } from './entities/producto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CrearProductoDto } from './dto/create-producto.dto';
import { EditarProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductosService extends BaseService<Producto, CrearProductoDto, EditarProductoDto> {
  constructor(
    @InjectRepository(Producto)
    productosRepo: Repository<Producto>
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
}
 