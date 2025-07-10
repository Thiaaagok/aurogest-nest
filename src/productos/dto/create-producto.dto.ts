import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
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
    @IsString()
    PrecioVenta: string;
  
    @IsNotEmpty()
    @IsString()
    PrecioCompra: string;
  
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

    @IsNumber()
    Stock: number;
  
    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    Imagenes: string[];
  
    @IsOptional()
    @IsString()
    ImagenPresentacion: string;
  
    @IsOptional()
    @IsArray()
    Detalles?: string[];
  }