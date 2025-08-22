import { Controller, Get, Param } from '@nestjs/common';
import { RegistrosService } from './registros.service';

@Controller('registros')
export class RegistrosController {
  constructor(private readonly registrosService: RegistrosService) { }

  @Get()
  findAll() {
    return this.registrosService.findAll();
  }

  @Get('producto/:id/actualizaciones-precio')
  obtenerActualizacionesPrecioPorProducto(@Param('id') id: string) {
    return this.registrosService.obtenerRegistrosPorProducto(id);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registrosService.findOne(+id);
  }
}
