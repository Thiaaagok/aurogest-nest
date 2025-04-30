import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, ValidationPipe, UsePipes, Put } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CrearProductoDto } from './dto/create-producto.dto';
import { EditarProductoDto } from './dto/update-producto.dto';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}
   
  @Get()
  obtenerTodosLosProductos(){

      return this.productosService.obtenerTodos();
  }

  @Get(':id')
  obtenerProductoPorId( @Param('id', ParseUUIDPipe ) id:string){
      return this.productosService.obtenerPorId(id);
  }

  @Post()
  @UsePipes( ValidationPipe)
  crearProducto( @Body() proveedor: CrearProductoDto){
      this.productosService.crear(proveedor);
  }

  @Patch(':id')
  inactivarReactivarProducto( @Param('id', ParseUUIDPipe) id: string){
      this.productosService.reactivar(id);
  }

  @Put(':id')
  editarProducto( @Body() proveedor: EditarProductoDto, @Param('id', ParseUUIDPipe) id: string){
      this.productosService.editar(proveedor, id);
  }

  @Delete(':id')
  eliminarProducto(@Param('id', ParseUUIDPipe) id: string){
      this.productosService.eliminar(id);
  }
}
