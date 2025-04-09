import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { Empresa } from './entities/empresa.entity';
import { CrearEmpresaDto } from './dto/create-empresa.dto';
import { editarEmpresaDto } from './dto/update-empresa.dto';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmpresasService extends BaseService<Empresa, CrearEmpresaDto, editarEmpresaDto> {
    constructor(
      @InjectRepository(Empresa)
      usuarioRepo: Repository<Empresa>
    ) {
      super(usuarioRepo, 'Empresa');
    }

    public async reactivar(id: string): Promise<Empresa> {
      const entity = await this.repository.findOne({
        where: { Id: id } as FindOptionsWhere<Empresa>,
    });

    if (!entity) {
        throw new NotFoundException(`El id ${id} no fue encontrado`);
    }

    entity.Activo = true;

    return this.repository.save(entity);
    }

    public async eliminar(id: string): Promise<Empresa> {
        const entity = await this.repository.findOne({
            where: { Id: id } as FindOptionsWhere<Empresa>,
        });
    
        if (!entity) {
            throw new NotFoundException(`El id ${id} no fue encontrado`);
        }
    
        entity.Activo = false;
    
        return this.repository.save(entity);
    }
}
