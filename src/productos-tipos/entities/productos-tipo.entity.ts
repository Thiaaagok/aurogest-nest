import { Empresa } from "src/empresas/entities/empresa.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToOne(() => Empresa, { eager: true, nullable: true })
    @JoinColumn({ name: 'empresa' })
    Empresa: Empresa;
}
