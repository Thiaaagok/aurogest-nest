import { Empresa } from "src/empresas/entities/empresa.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
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
