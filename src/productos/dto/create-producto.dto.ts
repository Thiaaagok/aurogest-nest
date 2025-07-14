import { IsArray, IsCurrency, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Categoria } from "src/categorias/entities/categoria.entity";
import { Marca } from "src/marcas/entities/marca.entity";
import { ProductoTipo } from "src/productos-tipos/entities/productos-tipo.entity";
import { Proveedor } from "src/proveedores/entities/proveedor.entity";

export class CrearProductoDto {

    @IsNotEmpty()
    @IsString()
    Codigo: string;
  
    @IsNotEmpty()
    @IsString()
    Nombre: string;
  
    @IsNotEmpty()
    @IsNumber()
    PrecioVenta: number;
  
    @IsNotEmpty()
    @IsNumber()
    PrecioCompra: number;
  
    @IsOptional() 
    Tipo?: ProductoTipo | null;
    
    @IsOptional()
    Marca?: Marca | null;
    
    @IsOptional()
    Categoria?: Categoria | null;
    
    @IsOptional()
    @IsNumber()
    CodigoBarra: number;

    @IsArray()
    @IsNotEmpty()
    Proveedores: Proveedor[];

    @IsNumber()
    Stock: number;
  }