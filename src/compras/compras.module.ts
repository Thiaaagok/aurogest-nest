import { Module } from '@nestjs/common';
import { ComprasService } from './compras.service';
import { ComprasController } from './compras.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from 'src/productos/entities/producto.entity';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Marca } from 'src/marcas/entities/marca.entity';
import { ProductoTipo } from 'src/productos-tipos/entities/productos-tipo.entity';
import { Compra, CompraItem } from './entities/compra.entity';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  controllers: [ComprasController],
  providers: [ComprasService],
  imports: [
    TypeOrmModule.forFeature([Producto, Categoria, Marca, ProductoTipo, Compra, CompraItem]),
    UsuariosModule
  ]
})
export class ComprasModule { }
