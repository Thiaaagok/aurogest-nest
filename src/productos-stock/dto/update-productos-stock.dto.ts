import { PartialType } from '@nestjs/mapped-types';
import { CreateProductosStockDto } from './create-productos-stock.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateProductosStockDto extends PartialType(CreateProductosStockDto) {
    @IsNumber()
    @IsOptional()
    stockResevardo: number;
}
