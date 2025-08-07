
import { Producto } from "src/productos/entities/producto.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductoStock {
    @PrimaryGeneratedColumn('uuid')
    Id: string;

    @OneToOne(() => Producto, { eager: true })
    @JoinColumn({ name: 'producto_id' })
    Producto: Producto;

    @Column('int')
    StockActual: number;

    @Column('int')
    StockMinimo: number;

    @Column({ type: 'timestamp', nullable: true })
    UltimaActualizacion?: Date;

    @Column({ default: true })
    Activo: boolean;

    @Column({ type: 'text', nullable: true })
    Observaciones?: string;

    @Column('int', { nullable: true })
    StockReservado?: number;
}
