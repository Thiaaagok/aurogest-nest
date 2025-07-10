import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Usuario } from './model/usuario.model';
import { CrearUsuarioDto } from './dto/crear-usuario-dto';
import { EditarUsuarioDto } from './dto/editar-usuario-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { EmpresasService } from 'src/empresas/empresas.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsuariosService {
  protected readonly logger: Logger;
  protected readonly entityName: string = "usuario";
  protected readonly empresasService: EmpresasService;
  constructor(
    @InjectRepository(Usuario)
    protected readonly usuarioRepo: Repository<Usuario>,
    protected readonly _empresasService: EmpresasService
  ) {
    this.logger = new Logger(`UsuarioService`);
    this.empresasService = _empresasService;
  }

  public async reactivar(id: string): Promise<Usuario> {
    const entity = await this.usuarioRepo.findOne({
      where: { Id: id } as FindOptionsWhere<Usuario>,
  });

  if (!entity) {
      throw new NotFoundException(`El id ${id} no fue encontrado`);
  }

  entity.Activo = true;

  return this.usuarioRepo.save(entity);
  }

  public async eliminar(id: string): Promise<Usuario> {
      const entity = await this.usuarioRepo.findOne({
          where: { Id: id } as FindOptionsWhere<Usuario>,
      });
  
      if (!entity) {
          throw new NotFoundException(`El id ${id} no fue encontrado`);
      }
  
      entity.Activo = false;
  
      return this.usuarioRepo.save(entity);
  }

    public obtenerTodos() {
      return this.usuarioRepo.find({});
  }

  public async obtenerPorId(id: string): Promise<Usuario> {
    const entity = await this.usuarioRepo.findOneBy({ Id: id } as any);
    if (!entity) {
        throw new NotFoundException(`${this.entityName} con id ${id} no fue encontrado`);
    }
    return entity;
  }

  public async editar(dto: EditarUsuarioDto, id: string): Promise<Usuario> {
    const entity = await this.usuarioRepo.preload({
        Id: id,
        ...dto,
    } as DeepPartial<Usuario>);

    if (!entity) {
        throw new NotFoundException(`${this.entityName} con el id ${id} no fue encontrado`);
    }

    return this.usuarioRepo.save(entity);
  }

  public async crear(dto: CrearUsuarioDto): Promise<Usuario> {
    try {
      const entity = this.usuarioRepo.create(dto as DeepPartial<Usuario>);
      (entity as any).Id = uuidv4();
      (entity as any).Activo = true;
      return await this.usuarioRepo.save(entity);
    } catch (error) {
      if (error.code === '23505') {
          throw new BadRequestException(error.detail);
      }
      this.logger.error(error);
      throw new InternalServerErrorException('Unexpected error, check server logs');
    }
  }
}