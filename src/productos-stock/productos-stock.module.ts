import { forwardRef, Module } from '@nestjs/common';
import { ProductosStockService } from './productos-stock.service';
import { ProductosStockController } from './productos-stock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoStock, ProductoStockLote, ProductoStockLoteEstado } from './entities/productos-stock.entity';
import { ProductosModule } from 'src/productos/productos.module';

@Module({
  controllers: [ProductosStockController],
  providers: [ProductosStockService],
  imports: [
    TypeOrmModule.forFeature([ProductoStock, ProductoStockLote, ProductoStockLoteEstado]),
    forwardRef(() => ProductosModule),
  ],
  exports: [ProductosStockService],
})
export class ProductosStockModule { }