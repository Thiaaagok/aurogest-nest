import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Categoria {

    @PrimaryGeneratedColumn('uuid')
    Id: string;

    @Column('text')
    Codigo: string;

    @Column('text')
    Descripcion: string;

    @Column('boolean', { default: true })
    Activo: boolean;
}
