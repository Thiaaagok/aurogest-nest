import { IsBoolean, IsEmail, IsNumber, IsOptional, isString, IsString } from "class-validator";

export class CrearUsuarioDto {
    
    @IsOptional()
    Empresa: any;
    
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