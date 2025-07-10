import { IsEmail, IsNumber, IsOptional ,IsString } from "class-validator";
import { Empresa } from "src/empresas/entities/empresa.entity";

export class CrearUsuarioDto {

    @IsOptional()
    Empresa: Empresa;
    
    @IsString()
    Legajo: string;
    
    @IsNumber()
    intentosConexion: number;

    @IsNumber()
    expiracionTiempo: number;

    @IsString()
    Usuario: string;

    @IsString()
    Contrasenia: string;

    @IsEmail() 
    Mail: string;

    @IsString()
    @IsOptional()
    Observaciones: string;
}