import { IsDate, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { Producto } from "src/productos/entities/producto.entity";

export class CreateProductosStockDto {

    @IsObject()
    Producto: Producto;
    @IsNumber()
    StockActualTotal: number;
    @IsOptional()
    @IsDate()
    UltimaActualizacion?: Date;
    @IsOptional()
    @IsString()
    Observaciones?: string;
}
