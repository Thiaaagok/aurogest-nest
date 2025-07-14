import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductosTiposService } from './productos-tipos.service';
import { EditarProductoTipoDto } from './dto/update-productos-tipo.dto';
import { CrearProductoTipoDto } from './dto/create-productos-tipo.dto';


@Controller('productos-tipos')
export class ProductosTiposController {
    constructor(private readonly productosTiposService: ProductosTiposService) { }

    @Get()
    obtenerTodosLosProductoTipos() {
        return this.productosTiposService.obtenerTodos();
    }

    @Get(':id')
    obtenerProductoTipoPorId(@Param('id', ParseUUIDPipe) id: string) {
        return this.productosTiposService.obtenerPorId(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    crearProductoTipo(@Body() ProductoTipo: CrearProductoTipoDto) {
        return this.productosTiposService.crear(ProductoTipo);
    }

    @Patch(':id')
    inactivarReactivarProductoTipo(@Param('id', ParseUUIDPipe) id: string) {
        return this.productosTiposService.reactivar(id);
    }

    @Put(':id')
    editarProductoTipo(@Body() ProductoTipo: EditarProductoTipoDto, @Param('id', ParseUUIDPipe) id: string) {
        return this.productosTiposService.editar(ProductoTipo, id);
    }

    @Delete(':id')
    eliminaroProductoTipo(@Param('id', ParseUUIDPipe) id: string) {
        return this.productosTiposService.eliminar(id);
    }
}
