import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Marca } from 'src/marcas/entities/marca.entity';
import { Empresa } from 'src/empresas/entities/empresa.entity';
import { ProductoTipo } from 'src/productos-tipos/entities/productos-tipo.entity';

@Module({
  controllers: [ProductosController],
  providers: [ProductosService],
  imports: [
      TypeOrmModule.forFeature([ Producto, Categoria, Marca, Empresa, ProductoTipo ])
  ]
})
export class ProductosModule {}
