import { Empresa } from "src/empresas/entities/empresa.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Proveedor {
    @PrimaryGeneratedColumn('uuid')
    Id: string;
  
    @Column('text')
    Descripcion: string;
  
    @Column('text' )
    Codigo: string;
  
    @Column('text')
    Cuit: string;
  
    @Column('text')
    Telefono: string;
  
    @Column('text')
    Email: string;
  
    @Column({ nullable: true })
    Web: string;
  
    @Column('text', { nullable: true })
    Observaciones: string;
  
    @Column('text')
    Direccion: string;
  
    @Column('text')
    CodigoPostal: string;

    @ManyToOne(() => Empresa, { eager: true })
    @JoinColumn({ name: 'empresa' })
    Empresa: Empresa;
  
    @Column({ default: true })
    Activo: boolean;
}
