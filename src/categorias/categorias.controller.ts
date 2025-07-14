import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, ValidationPipe, UsePipes, Put } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CrearCategoriaDto } from './dto/create-categoria.dto';
import { EditarCategoriaDto } from './dto/update-categoria.dto';

@Controller('productos-categorias')
export class CategoriasController {
    constructor(private readonly categoriasService: CategoriasService) { }


    @Get()
    obtenerTodosLasCategoria() {

        return this.categoriasService.obtenerTodos();
    }

    @Get(':id')
    obtenerCategoriaPorId(@Param('id', ParseUUIDPipe) id: string) {
        return this.categoriasService.obtenerPorId(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    crearCategoria(@Body() usuario: CrearCategoriaDto) {
        return this.categoriasService.crear(usuario);
    }

    @Patch(':id')
    inactivarReactivarCategoria(@Param('id', ParseUUIDPipe) id: string) {
        return this.categoriasService.reactivar(id);
    }

    @Put(':id')
    editarCategoria(@Body() usuario: EditarCategoriaDto, @Param('id', ParseUUIDPipe) id: string) {
        return this.categoriasService.editar(usuario, id);
    }

    @Delete(':id')
    eliminarCategoria(@Param('id', ParseUUIDPipe) id: string) {
        return this.categoriasService.eliminar(id);
    }

}
