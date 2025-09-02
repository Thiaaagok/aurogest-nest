
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { Producto } from "src/productos/entities/producto.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CrearProductoStockLote } from "../dto/create-productos-stock.dto";

@Entity()
export class ProductoStock {
    @PrimaryGeneratedColumn('uuid')
    Id: string;

    @OneToOne(() => Producto, { eager: true })
    @JoinColumn({ name: 'producto_id' })
    Producto: Producto;

    @Column('int')
    StockActualTotal: number;

    @Column({ type: 'timestamp', nullable: true })
    UltimaActualizacion?: Date;

    @Column({ default: true })
    Activo: boolean;

    @Column({ type: 'text', nullable: true })
    Observaciones?: string;

    @ValidateNested({ each: true })
    @Type(() => CrearProductoStockLote)
    Lotes: ProductoStockLote[];

    @Column('int', { nullable: true })
    StockReservado?: number;
}

@Entity()
export class ProductoStockLoteEstado {
    @PrimaryGeneratedColumn('uuid')
    Id: string;

    @Column('text')
    Codigo: string;

    @Column('text')
    Descripcion: string;

    @Column('boolean', { default: true })
    Activo: boolean;
}


@Entity('producto_stock_lotes')
export class ProductoStockLote {

    @PrimaryGeneratedColumn('uuid')
    Id: string;

    @CreateDateColumn({ type: 'timestamp', name: 'fecha_ingreso' })
    FechaIngreso: Date;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        name: 'precio_unitario',
        nullable: false,
    })
    PrecioUnitario: number;

    @Column({
        type: 'int',
        name: 'cantidad_actual',
        nullable: false,
    })
    CantidadActual: number;

    @Column({
        type: 'int',
        name: 'cantidad_actual',
        nullable: false,
    })
    CantidadInicial: number;

    @ManyToOne(() => ProductoStockLoteEstado, { eager: true, nullable: false })
    @JoinColumn({ name: 'estado_id' })
    Estado: ProductoStockLoteEstado;
}
