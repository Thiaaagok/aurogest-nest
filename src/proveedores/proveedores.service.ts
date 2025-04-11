import { Injectable, NotFoundException } from '@nestjs/common';
import { CrearProveedorDto } from './dto/create-proveedore.dto';
import { EditarProveedorDto } from './dto/update-proveedore.dto';
import { Proveedor } from './entities/proveedor.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { BaseService } from 'src/base/base.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProveedoresService extends BaseService<Proveedor, CrearProveedorDto, EditarProveedorDto> {
    constructor(
      @InjectRepository(Proveedor)
      ProveedorRepo: Repository<Proveedor>
    ) {
      super(ProveedorRepo, 'Proveedor');
    }

    public async reactivar(id: string): Promise<Proveedor> {
      const entity = await this.repository.findOne({
        where: { Id: id } as FindOptionsWhere<Proveedor>,
    });

    if (!entity) {
        throw new NotFoundException(`El id ${id} no fue encontrado`);
    }

    entity.Activo = true;

    return this.repository.save(entity);
    }

    public async eliminar(id: string): Promise<Proveedor> {
        const entity = await this.repository.findOne({
            where: { Id: id } as FindOptionsWhere<Proveedor>,
        });
    
        if (!entity) {
            throw new NotFoundException(`El id ${id} no fue encontrado`);
        }
    
        entity.Activo = false;
    
        return this.repository.save(entity);
    }
}
