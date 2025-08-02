import { isBoolean, IsDate, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { Producto } from "src/productos/entities/producto.entity";

export class CreateProductosStockDto {

    @IsObject()
    Producto: Producto;
    @IsNumber()
    StockActual: number;
    @IsNumber()
    StockMinimo: number;
    @IsNumber()
    StockMaximo?: number;
    @IsDate()
    UltimaActualizacion?: Date;
    @IsString()
    Observaciones?: string;
}
