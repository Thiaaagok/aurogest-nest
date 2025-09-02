import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseUUIDPipe } from '@nestjs/common';
import { ProductosStockService } from './productos-stock.service';
import { CrearProductosStockDto } from './dto/create-productos-stock.dto';
import { UpdateProductosStockDto } from './dto/update-productos-stock.dto';

@Controller('stock')
export class ProductosStockController {
  constructor(private readonly productosStockService: ProductosStockService) { }

  @Post()
  create(@Body() createProductosStockDto: CrearProductosStockDto) {
    return this.productosStockService.crear(createProductosStockDto);
  }

  @Get()
  findAll() {
    return this.productosStockService.obtenerTodos();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productosStockService.obtenerPorId(id);
  }

  @Get('codigo-barra/:codigoBarra')
  encontrarPorCodigoBarra(@Param('codigoBarra') codigoBarra: string) {
    return this.productosStockService.obtenerPorCodigoBarra(codigoBarra);
  }

  @Put(':id')
  editarProducto(@Body() productoStock: UpdateProductosStockDto, @Param('id', ParseUUIDPipe) id: string) {
    return this.productosStockService.editar(productoStock, id);
  }

  @Patch(':id')
  ReactivarEmpresa(@Param('id', ParseUUIDPipe) id: string) {
    return this.productosStockService.reactivar(id);
  }

  @Delete(':id')
  eliminarProducto(@Param('id', ParseUUIDPipe) id: string) {
    return this.productosStockService.eliminar(id);
  }
}
