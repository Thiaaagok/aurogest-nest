import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, ValidationPipe, UsePipes, Put } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { EditarProveedorDto } from './dto/update-proveedore.dto';
import { CrearProveedorDto } from './dto/create-proveedore.dto';

@Controller('proveedores')
export class ProveedoresController {
    constructor(private readonly proveedoresService: ProveedoresService) { }

    @Get()
    obtenerTodosLosProveedores() {

        return this.proveedoresService.obtenerTodos();
    }

    @Get(':id')
    obtenerProveedorPorId(@Param('id', ParseUUIDPipe) id: string) {
        return this.proveedoresService.obtenerPorId(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    crearProveedor(@Body() proveedor: CrearProveedorDto) {
        return this.proveedoresService.crear(proveedor);
    }

    @Patch(':id')
    inactivarReactivarProveedor(@Param('id', ParseUUIDPipe) id: string) {
        return this.proveedoresService.reactivar(id);
    }

    @Put(':id')
    editarProveedor(@Body() proveedor: EditarProveedorDto, @Param('id', ParseUUIDPipe) id: string) {
        return this.proveedoresService.editar(proveedor, id);
    }

    @Delete(':id')
    eliminaroProveedor(@Param('id', ParseUUIDPipe) id: string) {
        return this.proveedoresService.eliminar(id);
    }
}
