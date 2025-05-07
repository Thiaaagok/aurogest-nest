import { Empresa } from "src/empresas/entities/empresa.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductoTipo {
    @PrimaryGeneratedColumn('uuid')
    Id: string;

    @Column('text')
    Codigo: string;

    @Column('text')
    Direccion: string;

    @ManyToOne(() => Empresa, { eager: true })
    @JoinColumn({ name: 'empresa' })
    Empresa: Empresa;

    @Column({ default: true })
    Activo: boolean;
}
