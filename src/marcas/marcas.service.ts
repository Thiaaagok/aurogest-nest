import { Injectable, NotFoundException } from '@nestjs/common';
import { CrearMarcaDto } from './dto/create-marca.dto';
import { EditarMarcaDto } from './dto/update-marca.dto';
import { BaseService } from 'src/base/base.service';
import { Marca } from './entities/marca.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MarcasService extends BaseService<Marca, CrearMarcaDto, EditarMarcaDto> {
    constructor(
      @InjectRepository(Marca)
      ProveedorRepo: Repository<Marca>
    ) {
      super(ProveedorRepo, 'Proveedor');
    }

    public async reactivar(id: string): Promise<Marca> {
      const entity = await this.repository.findOne({
        where: { Id: id } as FindOptionsWhere<Marca>,
    });

    if (!entity) {
        throw new NotFoundException(`El id ${id} no fue encontrado`);
    }

    entity.Activo = true;

    return this.repository.save(entity);
    }

    public async eliminar(id: string): Promise<Marca> {
        const entity = await this.repository.findOne({
            where: { Id: id } as FindOptionsWhere<Marca>,
        });
    
        if (!entity) {
            throw new NotFoundException(`El id ${id} no fue encontrado`);
        }
    
        entity.Activo = false;
    
        return this.repository.save(entity);
    }
}
