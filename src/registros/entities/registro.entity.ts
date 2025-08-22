import { Producto } from "src/productos/entities/producto.entity";
import { Usuario } from "src/usuarios/model/usuario.model";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum TipoPrecio {
    COMPRA = 'COMPRA',
    VENTA = 'VENTA'
}

@Entity()
export class RegistroActualizacionPrecio {
    @PrimaryGeneratedColumn('uuid')
    Id: number;

    @ManyToOne(() => Producto, { eager: true })
    @JoinColumn({ name: 'producto_id' })
    Producto: Producto;

    @Column({
        type: 'enum',
        enum: TipoPrecio
    })
    Tipo: TipoPrecio;

    @Column('int', { default: 0 })
    PrecioAnterior: number;

    @Column('int', { default: 0 })
    PrecioNuevo: number;

    @Column('float', { default: 0 })
    Porcentaje: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    FechaActualizacion: Date;

    @ManyToOne(() => Usuario, { eager: true, nullable: true })
    @JoinColumn({ name: 'usuario_id' })
    Usuario?: Usuario;
}