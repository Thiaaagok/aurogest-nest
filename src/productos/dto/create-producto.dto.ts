import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Categoria } from "src/categorias/entities/categoria.entity";
import { Marca } from "src/marcas/entities/marca.entity";
import { ProductoStock } from "src/productos-stock/entities/productos-stock.entity";
import { ProductoTipo } from "src/productos-tipos/entities/productos-tipo.entity";
import { Proveedor } from "src/proveedores/entities/proveedor.entity";

export class CrearProductoDto {

  @IsNotEmpty()
  @IsString()
  Codigo: string;

  @IsNotEmpty()
  @IsString()
  Descripcion: string;

  @IsNotEmpty()
  @IsNumber()
  PrecioCompra: number;

  @IsNotEmpty()
  @IsNumber()
  PrecioVenta: number;

  @IsOptional()
  Tipo?: ProductoTipo | null;

  @IsOptional()
  Marca?: Marca | null;

  @IsOptional()
  Categoria?: Categoria | null;

  @IsOptional()
  @IsString()
  CodigoBarra: string;

  @IsArray()
  @IsNotEmpty()
  Proveedores: Proveedor[];

  @IsArray()
  @IsOptional()
  Imagenes: string[];
}