import { PartialType } from '@nestjs/mapped-types';
import { CreateProductosTipoDto } from './create-productos-tipo.dto';

export class UpdateProductosTipoDto extends PartialType(CreateProductosTipoDto) {}
