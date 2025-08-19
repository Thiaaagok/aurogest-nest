import { PartialType } from "@nestjs/mapped-types";
import { CrearProveedorDto } from "./create-proveedore.dto";

export class EditarProveedorDto extends PartialType(CrearProveedorDto) {
}
