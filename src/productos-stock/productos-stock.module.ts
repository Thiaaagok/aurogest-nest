import { forwardRef, Module } from '@nestjs/common';
import { ProductosStockService } from './productos-stock.service';
import { ProductosStockController } from './productos-stock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from 'src/productos/entities/producto.entity';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Marca } from 'src/marcas/entities/marca.entity';
import { Empresa } from 'src/empresas/entities/empresa.entity';
import { ProductoTipo } from 'src/productos-tipos/entities/productos-tipo.entity';
import { ProductoStock } from './entities/productos-stock.entity';
import { ProductosService } from 'src/productos/productos.service';
import { RegistrosModule } from 'src/registros/registros.module';
import { ProductosModule } from 'src/productos/productos.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  controllers: [ProductosStockController],
  providers: [ProductosStockService],
  imports: [
    TypeOrmModule.forFeature([ProductoStock]),
    forwardRef(() => ProductosModule), 
  ],
  exports: [ProductosStockService],
})
export class ProductosStockModule {}