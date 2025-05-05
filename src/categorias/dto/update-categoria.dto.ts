import { IsString } from "class-validator";


export class EditarCategoriaDto  {
    
    @IsString()
    Descripcion: string;
    
    @IsString()
    Codigo: string;
    
}
