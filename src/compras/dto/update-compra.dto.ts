import { PartialType } from '@nestjs/mapped-types';
import { IsUUID } from 'class-validator';
import { CompraCreateDto } from './create-compra.dto';

export class UpdateCompraDto extends PartialType(CompraCreateDto) {
    @IsUUID()
    id: string;
}
