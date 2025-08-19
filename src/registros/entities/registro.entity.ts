import { Compra } from "src/compras/entities/compra.entity";
import { Usuario } from "src/usuarios/model/usuario.model";
import { Entity } from "typeorm";

@Entity()
export class RegistroError {
    Usuario: Usuario
}

@Entity()
export class RegistroCompra {
    Usuario: Usuario
    Compra: Compra
}

@Entity()
export class RegistroVenta {
    Usuario: Usuario
}

@Entity()
export class RegistroAltaModificacion {
    Usuario: Usuario
}