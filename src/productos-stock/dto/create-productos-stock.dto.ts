import { IsArray, IsDate, IsEmpty, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, IsUUID } from "class-validator";
import { Producto } from "src/productos/entities/producto.entity";

export class CrearProductosStockDto {

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
    @IsArray()
    @IsEmpty()
    Lotes: any[];
}


export class CrearProductoStockLote {

    @IsUUID()
    Id: string;

    @IsDate()
    FechaIngreso: Date;

    @IsNotEmpty()
    @IsNumber()
    PrecioUnitario: number;

    @IsNotEmpty()
    @IsNumber()
    CantidadActual: number;
}
