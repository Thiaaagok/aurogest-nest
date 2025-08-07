import { Body, Controller, Post, Res } from '@nestjs/common';
import { FacturasService } from './facturas.service';
import { Response } from 'express';

@Controller('facturas')
export class FacturasController {
  constructor(private readonly facturasService: FacturasService) { }

  @Post()
  async generar(@Body() datosFactura: any, @Res() res: Response) {
    this.facturasService.imprimirFactura(datosFactura);
    return { status: 'OK' };
  }
}
