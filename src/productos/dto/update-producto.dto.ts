import { IsArray, IsOptional, IsString } from "class-validator";
import { Marca } from "src/marcas/entities/marca.entity";
import { ProductoTipo } from "src/productos-tipos/entities/productos-tipo.entity";
import { Proveedor } from "src/proveedores/entities/proveedor.entity";

export class EditarProductoDto{
  @IsOptional()
  @IsString()
  Codigo?: string;

  @IsOptional()
  @IsString()
  Descripcion?: string;

  @IsOptional()
  @IsString()
  PrecioVenta?: string;

  @IsOptional()
  @IsString()
  PrecioCompra?: string;

  @IsOptional()
  Tipo?: ProductoTipo;

  @IsOptional()
  Marca?: Marca;

  @IsOptional()
  @IsArray()
  Proveedores?: Proveedor[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  Imagenes?: string[];

  @IsOptional()
  @IsString()
  ImagenPresentacion?: string;

  @IsOptional()
  @IsString()
  Detalles?: string;
}
