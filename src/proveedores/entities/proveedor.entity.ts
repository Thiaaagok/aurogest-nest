import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
  
    @Column('int', { default: 0 })
    Telefono: number;
  
    @Column('text')
    Email: string;
  
    @Column({ nullable: true })
    Web: string;
  
    @Column('text', { nullable: true })
    Observaciones: string;
  
    @Column('text')
    Direccion: string;
  
    @Column('int', { default: 0 })
    CodigoPostal: number;
  
    @Column({ default: true })
    Activo: boolean;
}
