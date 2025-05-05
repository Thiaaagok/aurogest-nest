import { IsBoolean, IsString, IsUUID } from "class-validator";


export class EditarMarcaDto {

    @IsString()
    Descripcion: string;
    
    @IsString()
    Codigo: string;

}
