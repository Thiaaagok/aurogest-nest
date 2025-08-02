import { Injectable } from '@nestjs/common';
import { CreateProductosStockDto } from './dto/create-productos-stock.dto';
import { UpdateProductosStockDto } from './dto/update-productos-stock.dto';

@Injectable()
export class ProductosStockService {
  create(createProductosStockDto: CreateProductosStockDto) {
    return 'This action adds a new productosStock';
  }

  findAll() {
    return `This action returns all productosStock`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productosStock`;
  }

  update(id: number, updateProductosStockDto: UpdateProductosStockDto) {
    return `This action updates a #${id} productosStock`;
  }

  remove(id: number) {
    return `This action removes a #${id} productosStock`;
  }
}
