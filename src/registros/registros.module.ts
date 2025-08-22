import { Module } from '@nestjs/common';
import { RegistrosService } from './registros.service';
import { RegistrosController } from './registros.controller';
import { RegistroActualizacionPrecio } from './entities/registro.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [RegistrosController],
  providers: [RegistrosService],
  exports: [RegistrosService],
  imports: [TypeOrmModule.forFeature([RegistroActualizacionPrecio])]
})
export class RegistrosModule {}
