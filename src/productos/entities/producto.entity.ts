import { Marca } from "src/marcas/entities/marca.entity";
import { ProductoTipo } from "src/productos-tipos/entities/productos-tipo.entity";
import { Proveedor } from "src/proveedores/entities/proveedor.entity";
import { Usuario } from "src/usuarios/model/usuario.model";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Producto {

    @PrimaryGeneratedColumn('uuid')
    Id: string;

    @Column('text', { unique: true })
    Codigo: string;

    @Column('text')
    Descripcion: string;

    @Column('text')
    PrecioVenta: string;

    @Column('text')
    PrecioCompra: string;

    @ManyToOne(() => ProductoTipo, { eager: true })
    @JoinColumn({ name: 'tipoProducto' })
    Tipo: ProductoTipo;

    @ManyToOne(() => Marca, { eager: true })
    @JoinColumn({ name: 'marcaProducto' })
    Marca: Marca;

    @ManyToOne(() => Usuario, { eager: true })
    @JoinColumn({ name: 'usuarioId' })
    Usuario: Usuario;

    @Column('boolean')
    Activo: boolean;

    @ManyToMany(() => Proveedor, { eager: true })
    @JoinTable()
    Proveedores: Proveedor[];

    @Column('text', { array: true, nullable: true })
    Imagenes: string[];

    @Column('text', { nullable: true })
    ImagenPresentacion: string;

    @Column('text', { nullable: true })
    Detalles: string;
}