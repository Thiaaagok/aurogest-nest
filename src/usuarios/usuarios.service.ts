import { Injectable, NotFoundException } from '@nestjs/common';
import { Usuario } from './model/usuario.model';
import { CrearUsuarioDto } from './dto/crear-usuario-dto';
import { EditarUsuarioDto } from './dto/editar-usuario-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { BaseService } from 'src/base/base.service';

@Injectable()
export class UsuariosService extends BaseService<Usuario, CrearUsuarioDto, EditarUsuarioDto> {
    constructor(
      @InjectRepository(Usuario)
      usuarioRepo: Repository<Usuario>
    ) {
      super(usuarioRepo, 'Usuario');
    }

    public async reactivar(id: string): Promise<Usuario> {
      const entity = await this.repository.findOne({
        where: { Id: id } as FindOptionsWhere<Usuario>,
    });

    if (!entity) {
        throw new NotFoundException(`El id ${id} no fue encontrado`);
    }

    entity.Activo = true;

    return this.repository.save(entity);
    }

    public async eliminar(id: string): Promise<Usuario> {
        const entity = await this.repository.findOne({
            where: { Id: id } as FindOptionsWhere<Usuario>,
        });
    
        if (!entity) {
            throw new NotFoundException(`El id ${id} no fue encontrado`);
        }
    
        entity.Activo = false;
    
        return this.repository.save(entity);
    }
}