import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, ValidationPipe, UsePipes, Put } from '@nestjs/common';
import { MarcasService } from './marcas.service';
import { CrearMarcaDto } from './dto/create-marca.dto';
import { EditarMarcaDto } from './dto/update-marca.dto';

@Controller('marcas')
export class MarcasController {
  constructor(private readonly marcasService: MarcasService) {}

    @Get()
    obtenerTodosLasMarca(){

        return this.marcasService.obtenerTodos();
    }

    @Get(':id')
    obtenerMarcaPorId( @Param('id', ParseUUIDPipe ) id:string){
        return this.marcasService.obtenerPorId(id);
    }

    @Post()
    @UsePipes( ValidationPipe)
    crearMarca( @Body() usuario: CrearMarcaDto){
        this.marcasService.crear(usuario);
    }

    @Patch(':id')
    inactivarReactivarMarca( @Param('id', ParseUUIDPipe) id: string){
        this.marcasService.reactivar(id);
    }

    @Put(':id')
    editarMarca( @Body() usuario: EditarMarcaDto, @Param('id', ParseUUIDPipe) id: string){
        this.marcasService.editar(usuario, id);
    }

    @Delete(':id')
    eliminarMarca(@Param('id', ParseUUIDPipe) id: string){
        this.marcasService.eliminar(id);
    }
}
