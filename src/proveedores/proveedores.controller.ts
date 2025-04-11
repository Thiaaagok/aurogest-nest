import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, ValidationPipe, UsePipes, Put } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { EditarProveedorDto } from './dto/update-proveedore.dto';
import { CrearProveedorDto } from './dto/create-proveedore.dto';

@Controller('proveedores')
export class ProveedoresController {
   constructor(private readonly proveedoresService: ProveedoresService) {}
  
      @Get()
      obtenerTodosLosUsuarios(){
  
          return this.proveedoresService.obtenerTodos();
      }
  
      @Get(':id')
      obtenerUsuarioPorId( @Param('id', ParseUUIDPipe ) id:string){
          return this.proveedoresService.obtenerPorId(id);
      }
  
      @Post()
      @UsePipes( ValidationPipe)
      crearUsuario( @Body() proveedor: CrearProveedorDto){
          this.proveedoresService.crear(proveedor);
      }
  
      @Patch(':id')
      inactivarReactivarUsuario( @Param('id', ParseUUIDPipe) id: string){
          this.proveedoresService.reactivar(id);
      }
  
      @Put(':id')
      editarUsuario( @Body() proveedor: EditarProveedorDto, @Param('id', ParseUUIDPipe) id: string){
          this.proveedoresService.editar(proveedor, id);
      }
  
      @Delete(':id')
      eliminarUsuario(@Param('id', ParseUUIDPipe) id: string){
          this.proveedoresService.eliminar(id);
      }
}
