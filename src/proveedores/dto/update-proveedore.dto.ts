import { IsEmail, IsNumber, IsOptional, IsString, IsUrl, Length } from "class-validator";

export class EditarProveedorDto {
    @IsString()
    @Length(1, 255)
    Descripcion: string;
  
    @IsString()
    @Length(1, 100)
    Codigo: string;
  
    @IsString()
    @Length(1, 20)
    Cuit: string;
  
    @IsNumber()
    @Length(1, 20)
    Telefono: number;
  
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
  
    @IsNumber()
    @Length(1, 10)
    CodigoPostal: number;

}
