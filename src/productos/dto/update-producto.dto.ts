import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Categoria } from "src/categorias/entities/categoria.entity";
import { Marca } from "src/marcas/entities/marca.entity";
import { ProductoTipo } from "src/productos-tipos/entities/productos-tipo.entity";
import { Proveedor } from "src/proveedores/entities/proveedor.entity";

export class EditarProductoDto {

  @IsNotEmpty()
  @IsString()
  Codigo: string;

  @IsNotEmpty()
  @IsString()
  Descripcion: string;

  @IsOptional()
  @IsNumber()
  Precio?: number;

  @IsOptional()
  Tipo?: ProductoTipo | null;

  @IsOptional()
  Marca?: Marca | null;

  @IsOptional()
  Categoria?: Categoria | null;

  @IsOptional()
  @IsArray()
  Proveedores?: Proveedor[];

  @IsArray()
  @IsOptional()
  Imagenes: string[];
}
