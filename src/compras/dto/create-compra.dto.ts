import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsUUID, IsNumber, Min, IsDate, ValidateNested } from 'class-validator';

export class CompraCreateDto {
    @IsDate()
    @Type(() => Date)
    fecha: Date;

    @IsNumber()
    @Min(0)
    total: number;

    @ValidateNested({ each: true })
    @Type(() => CompraItemCreateDto)
    items: CompraItemCreateDto[];
}


export class CompraItemCreateDto {
    @IsUUID()
    @IsNotEmpty()
    productoId: string;

    @IsNumber()
    @Min(1)
    cantidad: number;

    @IsNumber()
    subtotal: number;

    @IsUUID()
    @IsOptional()
    proveedorId?: string;
}