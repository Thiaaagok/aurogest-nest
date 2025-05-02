import { Module } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { ProveedoresController } from './proveedores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proveedor } from './entities/proveedor.entity';

@Module({
  controllers: [ProveedoresController],
  providers: [ProveedoresService],
<<<<<<< HEAD
  imports: [TypeOrmModule.forFeature([Proveedor])]
=======
  imports: [
    TypeOrmModule.forFeature([ Proveedor ])
  ]
>>>>>>> b7245d13130b8e140eb4231ddd66a725420d2c16
})
export class ProveedoresModule {}
