import { IsArray, IsCurrency, IsNumber, IsOptional, IsString } from "class-validator";
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
  @IsNumber()
  PrecioVenta?: number;

  @IsOptional()
  @IsNumber()
  PrecioCompra?: number;

  @IsOptional()
  @IsNumber()
  CodigoBarra: number;

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

}
