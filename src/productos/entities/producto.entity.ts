import { Categoria } from "src/categorias/entities/categoria.entity";
import { Marca } from "src/marcas/entities/marca.entity";
import { ProductoStock } from "src/productos-stock/entities/productos-stock.entity";
import { ProductoTipo } from "src/productos-tipos/entities/productos-tipo.entity";
import { Proveedor } from "src/proveedores/entities/proveedor.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Producto {

    @PrimaryGeneratedColumn('uuid')
    Id: string;

    @Column('text', { unique: true })
    Codigo: string;

    @Column('text')
    Nombre: string;

    @Column('int', { default: 0 })
    PrecioCompra: number;

    @Column('int', { default: 0 })
    PrecioVenta: number;

    @Column('text', { unique: true , default: ''})
    CodigoBarra: string;

    @ManyToOne(() => ProductoTipo, { eager: true, nullable: true })
    @JoinColumn({ name: 'tipoProducto' })
    Tipo: ProductoTipo;

    @ManyToOne(() => Marca, { eager: true, nullable: true })
    @JoinColumn({ name: 'marcaProducto' })
    Marca: Marca;

    @ManyToOne(() => Categoria, { eager: true, nullable: true })
    @JoinColumn({ name: 'categoriaProducto' })
    Categoria: Categoria;

    @OneToOne(() => ProductoStock, (productoStock) => productoStock.Producto)
    Stock: ProductoStock;

    @Column('boolean')
    Activo: boolean;

    @ManyToMany(() => Proveedor, { eager: true })
    @JoinTable()
    Proveedores: Proveedor[];
}