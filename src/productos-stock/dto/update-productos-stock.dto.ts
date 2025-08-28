import { PartialType } from '@nestjs/mapped-types';
import { CrearProductosStockDto } from './create-productos-stock.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateProductosStockDto extends PartialType(CrearProductosStockDto) {
    @IsNumber()
    @IsOptional()
    stockResevardo: number;
}
