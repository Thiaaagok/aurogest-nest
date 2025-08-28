import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsUUID, IsNumber, Min, IsDate, ValidateNested, IsString, IsArray } from 'class-validator';
import { Producto } from 'src/productos/entities/producto.entity';
import { Proveedor } from 'src/proveedores/entities/proveedor.entity';
import { Column } from 'typeorm';

export class CompraCreateDto {
    @IsDate()
    @Type(() => Date)
    Fecha: Date;

    @IsNumber()
    @Min(0)
    Total: number;

    @IsUUID()
    UsuarioId: string;

    @ValidateNested({ each: true })
    @Type(() => CompraItemCreateDto)
    Items: CompraItemCreateDto[];

    @IsArray()
    @Column('text', { array: true, nullable: false })
    ProductosId: string[];
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