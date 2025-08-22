import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsUUID, IsNumber, Min, IsDate, ValidateNested } from 'class-validator';
import { Producto } from 'src/productos/entities/producto.entity';
import { Proveedor } from 'src/proveedores/entities/proveedor.entity';

export class CompraCreateDto {
    @IsDate()
    @Type(() => Date)
    Fecha: Date;

    @IsNumber()
    @Min(0)
    Total: number;

    @ValidateNested({ each: true })
    @Type(() => CompraItemCreateDto)
    Items: CompraItemCreateDto[];
}


export class CompraItemCreateDto {
    @IsNotEmpty()
    Producto: Producto;

    @IsNumber()
    @Min(1)
    Cantidad: number;

    @IsNumber()
    Subtotal: number;

    @IsOptional()
    Proveedor?: Proveedor;
}