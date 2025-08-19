import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity('compras')
export class Compra {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    fecha: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total: number;

    @OneToMany(() => CompraItem, (item) => item.compra, { cascade: true, eager: true })
    items: CompraItem[];
}

@Entity('compra_items')
export class CompraItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Compra, (compra) => compra.items, { onDelete: 'CASCADE' })
    compra: Compra;

    @Column()
    productoId: string; // FK hacia Producto

    @Column({ type: 'int' })
    cantidad: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    subtotal: number;

    @Column({ nullable: true })
    proveedorId?: string; // FK hacia Proveedor
}