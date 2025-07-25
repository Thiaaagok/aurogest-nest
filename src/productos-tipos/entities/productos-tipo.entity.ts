import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductoTipo {
    @PrimaryGeneratedColumn('uuid')
    Id: string;

    @Column('text')
    Codigo: string;

    @Column('text')
    Descripcion: string;

    @Column({ default: true })
    Activo: boolean;
}
