import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { Categoria } from './entities/categoria.entity';
import { CrearCategoriaDto } from './dto/create-categoria.dto';
import { EditarCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class CategoriasService extends BaseService<Categoria, CrearCategoriaDto, EditarCategoriaDto> {
  constructor(
    @InjectRepository(Categoria)
    ProveedorRepo: Repository<Categoria>
  ) {
    super(ProveedorRepo, 'Proveedor');
  }

  public async reactivar(id: string): Promise<Categoria> {
    const entity = await this.repository.findOne({
    where: { Id: id } as FindOptionsWhere<Categoria>,
    });

    if (!entity) {
      throw new NotFoundException(`El id ${id} no fue encontrado`);
    }

    entity.Activo = true;

    return this.repository.save(entity);
  }

  public async eliminar(id: string): Promise<Categoria> {
    const entity = await this.repository.findOne({
        where: { Id: id } as FindOptionsWhere<Categoria>,
    });

    if (!entity) {
        throw new NotFoundException(`El id ${id} no fue encontrado`);
    }

    entity.Activo = false;

    return this.repository.save(entity);
  }

}