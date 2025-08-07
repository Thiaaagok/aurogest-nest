import { Injectable } from '@nestjs/common';
const escpos = require('escpos');
escpos.USB = require('escpos-usb');

@Injectable()
export class FacturasService {

    constructor() {
    }

    imprimirFactura(datos: any): Promise<boolean> {
        const escpos = require('escpos');
        escpos.USB = require('escpos-usb');
        const device = new escpos.USB(4070, 33054); 
        const printer = new escpos.Printer(device);
        return new Promise((resolve, reject) => {
            device.open((error) => {
                if (error) return reject(error);

                printer
                    .align('CT')
                    .style('B')
                    .size(1, 1)
                    .text('FACTURA')
                    .text('-------------------------------')
                    .align('LT')
                    .text(`Fecha: ${datos.fecha}`)
                    .text(`Cliente: ${datos.cliente}`)
                    .text('-------------------------------');

                datos.items.forEach((item) => {
                    const nombre = item.nombre.padEnd(20, ' ').slice(0, 20);
                    const cantidad = String(item.cantidad).padStart(2, ' ');
                    const precio = String(item.precio).padStart(6, ' ');
                    printer.text(`${nombre}${cantidad}x${precio}`);
                });

                printer
                    .text('-------------------------------')
                    .align('RT')
                    .text(`TOTAL: $${datos.total}`)
                    .cut()
                    .close(() => resolve(true));
            });
        });
    }
}
