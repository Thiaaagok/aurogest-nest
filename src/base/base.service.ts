import {
    NotFoundException,
    InternalServerErrorException,
    BadRequestException,
    Logger,
} from '@nestjs/common';
import { Repository, DeepPartial } from 'typeorm';
import { v4 as uuid } from 'uuid';

export interface BaseEntity {
    Id: string;
    Activo: boolean;
}

export class BaseService<T extends BaseEntity, CrearDto = any, EditarDto = any> {
    protected readonly logger: Logger;

    constructor(
        protected readonly repository: Repository<T>,
        private readonly entityName: string
    ) {
        this.logger = new Logger(`${entityName}Service`);
    }

    public obtenerTodos() {
        return this.repository.find({});
    }

    public async obtenerPorId(id: string): Promise<T> {
        const entity = await this.repository.findOneBy({ Id: id } as any);
        if (!entity) {
            throw new NotFoundException(`${this.entityName} con id ${id} no fue encontrado`);
        }
        return entity;
    }

    public async editar(dto: EditarDto, id: string): Promise<T> {
        const entity = await this.repository.preload({
            Id: id,
            ...dto,
        } as DeepPartial<T>);

        if (!entity) {
            throw new NotFoundException(`${this.entityName} con el id ${id} no fue encontrado`);
        }

        return this.repository.save(entity);
    }

    public async crear(dto: CrearDto): Promise<T> {
        const entity = this.repository.create(dto as DeepPartial<T>);
        (entity as any).Id = uuid();
        (entity as any).Activo = true;
        return await this.repository.save(entity);
    }
}
