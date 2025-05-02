import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Marca {
    @PrimaryGeneratedColumn('uuid')
    Id: string;

    @Column('text')
    Codigo: string;

    @Column('text')
    Direccion: string;

    @Column({ default: true })
    Activo: boolean;
}
