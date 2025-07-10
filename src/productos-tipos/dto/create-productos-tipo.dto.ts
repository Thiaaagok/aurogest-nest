import { IsNotEmpty, IsString } from "class-validator";

export class CrearProductoTipoDto {
    @IsNotEmpty()
    @IsString()
    Codigo: string;
    
    @IsNotEmpty()
    @IsString()
    Descripcion: string;
}
