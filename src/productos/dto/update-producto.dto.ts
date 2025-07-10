import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";
import { Categoria } from "src/categorias/entities/categoria.entity";
import { Marca } from "src/marcas/entities/marca.entity";
import { ProductoTipo } from "src/productos-tipos/entities/productos-tipo.entity";
import { Proveedor } from "src/proveedores/entities/proveedor.entity";

export class EditarProductoDto{
  @IsOptional()
  @IsString()
  Codigo?: string;

  @IsOptional()
  @IsString()
  Nombre?: string;

  @IsOptional()
  @IsString()
  PrecioVenta?: string;

  @IsOptional()
  @IsString()
  PrecioCompra?: string;

  @IsOptional()
  @IsString()
  CodigoBarra: string;

  @IsOptional() 
  Tipo?: ProductoTipo | null;
  
  @IsOptional()
  Marca?: Marca | null;
  
  @IsOptional()
  Categoria?: Categoria | null;

  @IsOptional()
  @IsArray()
  Proveedores?: Proveedor[];

  @IsNumber()
  Stock: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  Imagenes?: string[];

  @IsOptional()
  @IsString()
  ImagenPresentacion?: string;

  @IsOptional()
  @IsArray()
  Detalles?: string[];
}
