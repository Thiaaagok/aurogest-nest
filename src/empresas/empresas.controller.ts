import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, ValidationPipe, UsePipes, Put } from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { CrearEmpresaDto } from './dto/create-empresa.dto';
import { editarEmpresaDto } from './dto/update-empresa.dto';

@Controller('empresas')
export class EmpresasController {
  constructor(private readonly empresasService: EmpresasService) {}

 @Get()
    obtenerTodosLosEmpresas(){

        return this.empresasService.obtenerTodos();
    }

    @Get(':id')
    obtenerEmpresaPorId( @Param('id', ParseUUIDPipe ) id:string){
        return this.empresasService.obtenerPorId(id);
    }

    @Post()
    @UsePipes( ValidationPipe)
    crearEmpresa( @Body() Empresa: CrearEmpresaDto){
        this.empresasService.crear(Empresa);
    }

    @Patch(':id')
    inactivarReactivarEmpresa( @Param('id', ParseUUIDPipe) id: string){
        this.empresasService.reactivar(id);
    }

    @Put(':id')
    editarEmpresa( @Body() Empresa: editarEmpresaDto, @Param('id', ParseUUIDPipe) id: string){
        this.empresasService.editar(Empresa, id);
    }

    @Delete(':id')
    eliminarEmpresa(@Param('id', ParseUUIDPipe) id: string){
        this.empresasService.eliminar(id);
    }
}
