
import { IsEmail, IsOptional, IsString, IsUrl, Length } from "class-validator";

export class CrearProveedorDto {
    @IsString()
    @Length(1, 255)
    Descripcion: string;
    
    @IsString()
    @Length(1, 100)
    Codigo: string;
    
    @IsString()
    @Length(1, 20)
    Cuit: string;
    
    @IsString()
    @Length(1, 20)
    Telefono: string;
    
    @IsEmail()
    @Length(1, 100)
    Email: string;
    
    @IsOptional()
    @IsUrl()
    @Length(1, 100)
    Web?: string;
    
    @IsOptional()
    @IsString()
    Observaciones?: string;
    
    @IsString()
    @Length(1, 255)
    Direccion: string;
    
    @IsString()
    @Length(1, 10)
    CodigoPostal: string;
}
