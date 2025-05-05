import { IsString } from "class-validator";

export class CrearCategoriaDto {
    
    @IsString()
    Descripcion: string;
    
    @IsString()
    Codigo: string;
    
}
