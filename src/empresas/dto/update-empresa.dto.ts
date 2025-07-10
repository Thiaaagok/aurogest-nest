import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

export class editarEmpresaDto {
        @IsString()
        Codigo: string;

        @IsString()
        Descripcion: string;
      
        @IsOptional()
        @IsString()
        RazonSocial?: string;
      
        @IsOptional()
        @IsString()
        Cuit?: string;
      
        @IsOptional()
        @IsString()
        Telefono?: string;
      
        @IsOptional()
        @IsEmail()
        Email?: string;
      
        @IsOptional()
        @IsString()
        Direccion?: string;
      
        @IsOptional()
        @IsString()
        Localidad?: string;
      
        @IsOptional()
        @IsString()
        CodigoPostal?: string;
      
        @IsOptional()
        @IsUrl()
        LandingPageUrl?: string;
      
        @IsOptional()
        @IsUrl()
        LogoUrl?: string;
      
        @IsOptional()
        @IsString()
        Observaciones?: string;
}
