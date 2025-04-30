import { Injectable } from '@nestjs/common';
import { CreateProductosTipoDto } from './dto/create-productos-tipo.dto';
import { UpdateProductosTipoDto } from './dto/update-productos-tipo.dto';

@Injectable()
export class ProductosTiposService {
  create(createProductosTipoDto: CreateProductosTipoDto) {
    return 'This action adds a new productosTipo';
  }

  findAll() {
    return `This action returns all productosTipos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productosTipo`;
  }

  update(id: number, updateProductosTipoDto: UpdateProductosTipoDto) {
    return `This action updates a #${id} productosTipo`;
  }

  remove(id: number) {
    return `This action removes a #${id} productosTipo`;
  }
}
