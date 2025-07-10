import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './model/usuario.model';
import { EmpresasModule } from 'src/empresas/empresas.module';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [ UsuariosService],
  imports: [
    TypeOrmModule.forFeature([ Usuario ]),
    EmpresasModule,
  ]
})
export class UsuariosModule {}
