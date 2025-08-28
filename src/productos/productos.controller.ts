import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, ValidationPipe, UsePipes, Put, ParseIntPipe } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CrearProductoDto } from './dto/create-producto.dto';
import { EditarProductoDto } from './dto/update-producto.dto';

@Controller('productos')
export class ProductosController {
    constructor(private readonly productosService: ProductosService) { }

    @Get()
    obtenerTodosLosProductos() {
        return this.productosService.obtenerTodos();
    }

    @Get(':id')
    obtenerProductoPorId(@Param('id', ParseUUIDPipe) id: string) {
        return this.productosService.obtenerPorId(id);
    }

    @Get('codigo-barra/:codigoBarra')
    obtenerProductoPorCodigoBarra(@Param('codigoBarra') codigoBarra: string) {
        return this.productosService.obtenerPorCodigoBarra(codigoBarra);
    }

    @Post()
    @UsePipes(ValidationPipe)
    crearProducto(@Body() producto: CrearProductoDto) {
        return this.productosService.crear(producto, '123');
    }

    @Patch(':id')
    ReactivarProducto(@Param('id', ParseUUIDPipe) id: string) {
        return this.productosService.reactivar(id);
    }

    @Put(':id')
    editarProducto(@Body() producto: EditarProductoDto, @Param('id', ParseUUIDPipe) id: string) {
        return this.productosService.editar(producto, id);
    }

    @Put('editar-precio/:tipo/:id')
    editarPrecio(
        @Param('tipo') tipo: 'COMPRA' | 'VENTA',
        @Param('id', ParseUUIDPipe) id: string,
        @Body('nuevoPrecio', ParseIntPipe) nuevoPrecio: number
    ) {
        return this.productosService.editarPrecio(nuevoPrecio, id, tipo);
    }

    @Delete(':id')
    eliminarProducto(@Param('id', ParseUUIDPipe) id: string) {
        return this.productosService.eliminar(id);
    }
}
