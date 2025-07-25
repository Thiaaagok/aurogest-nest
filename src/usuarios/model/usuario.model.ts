import { Empresa } from "src/empresas/entities/empresa.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn('uuid')
    Id: string;

    @Column('text', {
        unique: true
    })
    Usuario: string

    @Column('text')
    Contrasenia: string;

    @Column('text')
    Mail: string;

    @Column('text')
    Legajo: string;

    @Column('int', { default: 0 })
    IntentosConexion: number;

    @Column('int', { default: 0 })
    ExpiracionTiempo: number;

    @Column('boolean',{
        default: false
    })
    Bloqueado: boolean;

    @Column('date',{
        nullable: true
    })
    UltimaConexion?: Date;

    @Column('text',{
        nullable: true 
    })
    Observaciones?: string;

    @Column('boolean')
    Activo: boolean;
}