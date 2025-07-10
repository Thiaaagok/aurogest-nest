import { Categoria } from "src/categorias/entities/categoria.entity";
import { Empresa } from "src/empresas/entities/empresa.entity";
import { Marca } from "src/marcas/entities/marca.entity";
import { ProductoTipo } from "src/productos-tipos/entities/productos-tipo.entity";
import { Proveedor } from "src/proveedores/entities/proveedor.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Producto {

    @PrimaryGeneratedColumn('uuid')
    Id: string;

    @Column('text', { unique: true })
    Codigo: string;

    @Column('text')
    Nombre: string;

    @Column('text')
    PrecioVenta: string;

    @Column('text')
    PrecioCompra: string;

    @Column('text', { nullable: true })
    CodigoBarra: string;

    @ManyToOne(() => ProductoTipo, { eager: true })
    @JoinColumn({ name: 'tipoProducto' })
    Tipo: ProductoTipo;

    @ManyToOne(() => Marca, { eager: true })
    @JoinColumn({ name: 'marcaProducto' })
    Marca: Marca;

    @ManyToOne(() => Empresa, { eager: true })
    @JoinColumn({ name: 'empresa' })
    Empresa: Empresa;

    @ManyToOne(() => Categoria, { eager: true })
    @JoinColumn({ name: 'categoriaProducto' })
    Categoria: Categoria;

    @Column('int', { default: 0 })
    Stock: number;

    @Column('boolean')
    Activo: boolean;

    @ManyToMany(() => Proveedor, { eager: true })
    @JoinTable()
    Proveedores: Proveedor[];

    @Column('text', { array: true, nullable: true })
    Imagenes: string[];

    @Column('text', { nullable: true })
    ImagenPresentacion: string;

    @Column('text', { array: true, nullable: true })
    Detalles: string[];
}