import { Injectable } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';

@Injectable()
export class VentasService {
  create(createVentaDto: CreateVentaDto) {
    return 'This action adds a new venta';
  }

  findAll() {
    return `This action returns all ventas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} venta`;
  }

  update(id: number, updateVentaDto: UpdateVentaDto) {
    return `This action updates a #${id} venta`;
  }

  remove(id: number) {
    return `This action removes a #${id} venta`;
  }

  /* procesarVentaItemMio(ventaItem: VentaItem): void {
    const productoStock = ventaItem.ProductoStock;
    let cantidadRestante = ventaItem.Cantidad;

    const lotesVendidos: ProductoStockLoteVendido[] = [];
    productoStock.StockActual = productoStock.StockActual - cantidadRestante;

    for (const lote of productoStock.Lotes) {
      if (cantidadRestante <= 0) break;
      const cantidadVendida = Math.min(lote.CantidadActual, cantidadRestante);
      lote.CantidadActual -= cantidadVendida;
      cantidadRestante -= cantidadVendida;

      const loteVendido: ProductoStockLoteVendido = {
        Lote: { ...lote },
        CantidadVendida: cantidadVendida,
        CantidadRestante: lote.CantidadActual
      };

      lotesVendidos.push(loteVendido);
    }
    ventaItem.LotesVendidos = lotesVendidos;
  } */
}
