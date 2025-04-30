import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductosTiposService } from './productos-tipos.service';
import { CreateProductosTipoDto } from './dto/create-productos-tipo.dto';
import { UpdateProductosTipoDto } from './dto/update-productos-tipo.dto';

@Controller('productos-tipos')
export class ProductosTiposController {
  constructor(private readonly productosTiposService: ProductosTiposService) {}

  @Post()
  create(@Body() createProductosTipoDto: CreateProductosTipoDto) {
    return this.productosTiposService.create(createProductosTipoDto);
  }

  @Get()
  findAll() {
    return this.productosTiposService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productosTiposService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductosTipoDto: UpdateProductosTipoDto) {
    return this.productosTiposService.update(+id, updateProductosTipoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productosTiposService.remove(+id);
  }
}
