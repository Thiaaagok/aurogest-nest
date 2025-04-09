import { Body, Controller, Delete, Get , Param, ParseUUIDPipe, Patch, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CrearUsuarioDto } from './dto/crear-usuario-dto';
import { EditarUsuarioDto } from './dto/editar-usuario-dto';

@Controller('usuarios')
export class UsuariosController {

    
  constructor(private readonly usuariosService: UsuariosService) {}

    @Get()
    obtenerTodosLosUsuarios(){

        return this.usuariosService.obtenerTodos();
    }

    @Get(':id')
    obtenerUsuarioPorId( @Param('id', ParseUUIDPipe ) id:string){
        return this.usuariosService.obtenerPorId(id);
    }

    @Post()
    @UsePipes( ValidationPipe)
    crearUsuario( @Body() usuario: CrearUsuarioDto){
        this.usuariosService.crear(usuario);
    }

    @Patch(':id')
    inactivarReactivarUsuario( @Param('id', ParseUUIDPipe) id: string){
        this.usuariosService.reactivar(id);
    }

    @Put(':id')
    editarUsuario( @Body() usuario: EditarUsuarioDto, @Param('id', ParseUUIDPipe) id: string){
        this.usuariosService.editar(usuario, id);
    }

    @Delete(':id')
    eliminarUsuario(@Param('id', ParseUUIDPipe) id: string){
        this.usuariosService.eliminar(id);
    }
}
