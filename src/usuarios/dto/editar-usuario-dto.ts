import { IsBoolean, IsDate, IsEmail, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { Empresa } from "src/empresas/entities/empresa.entity";

export class EditarUsuarioDto{

    Empresa: Empresa;
    
    @IsString()
    Legajo: string;
    
    @IsNumber()
    IntentosConexion: number;

    @IsNumber()
    ExpiracionTiempo: number;

    @IsString()
    Usuario: string;

    @IsString()
    Contrasenia: string;

    @IsEmail() 
    Mail: string;

    @IsBoolean()
    Activo: boolean;

    @IsBoolean()
    Bloqueado: boolean;

    @IsString()
    Observaciones: string;
    
}