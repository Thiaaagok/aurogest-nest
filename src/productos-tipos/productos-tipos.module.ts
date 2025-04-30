import { Module } from '@nestjs/common';
import { ProductosTiposService } from './productos-tipos.service';
import { ProductosTiposController } from './productos-tipos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoTipo } from './entities/productos-tipo.entity';

@Module({
  controllers: [ProductosTiposController],
  providers: [ProductosTiposService],
  imports: [
    TypeOrmModule.forFeature([ ProductoTipo ])
  ]
})
export class ProductosTiposModule {}
