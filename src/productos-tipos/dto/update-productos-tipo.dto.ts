import { IsNotEmpty, IsString } from "class-validator";

export class EditarProductoTipoDto {
    @IsNotEmpty()
    @IsString()
    Codigo: string;
    
    @IsNotEmpty()
    @IsString()
    Descripcion: string;
}
