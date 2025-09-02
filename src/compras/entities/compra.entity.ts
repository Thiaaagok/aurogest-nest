import { Producto } from 'src/productos/entities/producto.entity';
import { Proveedor } from 'src/proveedores/entities/proveedor.entity';
import { Usuario } from 'src/usuarios/model/usuario.model';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity('compras')
export class Compra {
    @PrimaryGeneratedColumn('uuid')
    Id: string;

    @Column()
    Fecha: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    Total: number;

    @ManyToOne(() => Usuario, { eager: true })
    Usuario: Usuario;

    @OneToMany(() => CompraItem, (item) => item.Compra, { cascade: true, eager: true })
    Items: CompraItem[];


}

@Entity('compra_items')
export class CompraItem {
    @PrimaryGeneratedColumn('uuid')
    Id: string;

    @ManyToOne(() => Compra, (compra) => compra.Items, { onDelete: 'CASCADE' })
    Compra: Compra;

    @ManyToOne(() => Producto, { eager: true })
    Producto: Producto;

    @Column({ type: 'int' })
    Cantidad: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    Subtotal: number;

    @ManyToOne(() => Proveedor, { eager: true, nullable: true })
    Proveedor: Proveedor;
}