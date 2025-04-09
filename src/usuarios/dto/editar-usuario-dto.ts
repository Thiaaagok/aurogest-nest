import { IsBoolean, IsDate, IsEmail, IsNumber, IsString, IsUUID } from "class-validator";

export class EditarUsuarioDto{

    @IsDate()
    ultimaConexion: Date;

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

    @IsBoolean()
    Activo: boolean;

    @IsBoolean()
    Bloqueado: boolean;

    @IsString()
    Observaciones: string;
    
}