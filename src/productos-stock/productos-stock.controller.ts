import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductosStockService } from './productos-stock.service';
import { CreateProductosStockDto } from './dto/create-productos-stock.dto';
import { UpdateProductosStockDto } from './dto/update-productos-stock.dto';

@Controller('productos-stock')
export class ProductosStockController {
  constructor(private readonly productosStockService: ProductosStockService) {}

  @Post()
  create(@Body() createProductosStockDto: CreateProductosStockDto) {
    return this.productosStockService.create(createProductosStockDto);
  }

  @Get()
  findAll() {
    return this.productosStockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productosStockService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductosStockDto: UpdateProductosStockDto) {
    return this.productosStockService.update(+id, updateProductosStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productosStockService.remove(+id);
  }
}
