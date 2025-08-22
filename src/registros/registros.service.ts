import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { RegistroActualizacionPrecio } from './entities/registro.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class RegistrosService {

  constructor(
    @InjectRepository(RegistroActualizacionPrecio)
    protected readonly registrosActualizacionPrecioRepo: Repository<RegistroActualizacionPrecio>,
  ) {
  }

  findAll() {
    return `This action returns all registros`;
  }

  findOne(id: number) {
    return `This action returns a #${id} registro`;
  }

  async registrarEdicionPrecioCompra(registro: RegistroActualizacionPrecio) {
    const entity = this.registrosActualizacionPrecioRepo.create(registro as DeepPartial<RegistroActualizacionPrecio>);
    (entity as any).Id = uuid();
    (entity as any).Tipo = 'COMPRA';
    return await this.registrosActualizacionPrecioRepo.save(entity);
  }

  async registrarEdicionPrecioVenta(registro: RegistroActualizacionPrecio) {
    const entity = this.registrosActualizacionPrecioRepo.create(registro as DeepPartial<RegistroActualizacionPrecio>);
    (entity as any).Id = uuid();
    (entity as any).Tipo = 'VENTA';
    return await this.registrosActualizacionPrecioRepo.save(entity);
  }

  async obtenerRegistrosPorProducto(productoId: string) {
    return await this.registrosActualizacionPrecioRepo.find({
      where: {
        Producto: { Id: productoId },
      },
      order: { FechaActualizacion: 'DESC' },
    });
  }
}
