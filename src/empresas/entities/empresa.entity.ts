import { Usuario } from "src/usuarios/model/usuario.model";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Empresa {
  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @Column()
  Descripcion: string;

  @Column('text')
  RazonSocial: string;

  @Column('text')
  Cuit: string;

  @Column('text')
  Telefono: string;

  @Column('text')
  Email: string;

  @Column('text')
  Direccion: string;

  @Column('text',{ nullable: true })
  Localidad?: string;

  @Column('text', { nullable: true })
  CodigoPostal?: string;

  @Column('text', { nullable: true })
  LandingPageUrl?: string;

  @Column('text', { nullable: true })
  LogoUrl?: string;

  @OneToMany(() => Usuario, usuario => usuario.Empresa)
  Usuarios: Usuario[];

  @Column('text', { nullable: true})
  Observaciones?: string;

  @Column({ default: true })
  Activo: boolean;
}