import { Module } from '@nestjs/common';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresasModule } from './empresas/empresas.module';
import { CommonModule } from './common/common.module';
import { BaseService } from './base/base.service';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { ProductosModule } from './productos/productos.module';
import { ComprasModule } from './compras/compras.module';
import { MarcasModule } from './marcas/marcas.module';
import { ProductosTiposModule } from './productos-tipos/productos-tipos.module';
import { CategoriasModule } from './categorias/categorias.module';
@Module({
  imports: [UsuariosModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL,
    }),
    EmpresasModule,
    CommonModule,
    ProveedoresModule,
    ProductosModule,
    ComprasModule,
    MarcasModule,
    ProductosTiposModule,
    CategoriasModule
  ],
  controllers: [],
  providers: [BaseService],
})
export class AppModule {}
