import { Controller, Get, Post, Body, Param, Res, Query } from '@nestjs/common';
import { ComprasService } from './compras.service';
import { CompraCreateDto } from './dto/create-compra.dto';
import { Compra } from './entities/compra.entity';
import { Response } from 'express';

@Controller('compras')
export class ComprasController {
  constructor(private readonly comprasService: ComprasService) { }

  @Post()
  create(@Body() comprasServiceStockDto: CompraCreateDto) {
    return this.comprasService.crear(comprasServiceStockDto);
  }

  @Get('buscar')
  buscarCompras(
    @Query('fechaDesde') fechaDesde: string,
    @Query('fechaHasta') fechaHasta: string,
    @Query('usuarioId') usuarioId?: string,
    @Query('productoId') productoId?: string,
  ) {
    return this.comprasService.buscarCompras({
      fechaDesde,
      fechaHasta,
      usuarioId,
      productoId,
    });
  }
  @Get()
  findAll() {
    return this.comprasService.obtenerTodos();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comprasService.obtenerPorId(id);
  }

  @Get('remito/:id')
  async descargarRemito(@Param('id') id: string, @Res() res: Response) {
    const compra: Compra = await this.comprasService.obtenerPorId(id);
    if (!compra) {
      return res.status(404).send('Compra no encontrada');
    }
    const pdfBuffer = await this.comprasService.generarRemito(compra);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=remito_Prueba.pdf`);
    res.end(pdfBuffer);
  }

  @Get('imprimir-remito/:id')
  async imprimirRemito(@Param('id') id: string) {
    try {
      // 1️⃣ Obtenemos la compra desde la base de datos
      const compra = await this.comprasService.obtenerPorId(id);
      if (!compra) {
        return { error: 'Compra no encontrada' };
      }

      // 2️⃣ Llamamos al servicio que imprime en POS58
      await this.comprasService.imprimirRemitoPOS58(compra);

      return { mensaje: 'Remito enviado a la impresora POS58 correctamente' };
    } catch (error) {
      console.error(error);
      return { error: 'Error al imprimir remito' };
    }
  }
}
