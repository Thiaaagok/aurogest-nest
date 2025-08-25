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
import { ProductosStockModule } from './productos-stock/productos-stock.module';
import { FacturasModule } from './facturas/facturas.module';
import { RegistrosModule } from './registros/registros.module';
import { VentasModule } from './ventas/ventas.module';
@Module({
  imports: [UsuariosModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres.railway.internal',
      url: 'postgresql://postgres:yjIXDjKDRwdsmUKBJLOEiBdZkDpfxSCZ@switchyard.proxy.rlwy.net:58672/railway',
      port: 5432,
      username: 'postgres',
      password: 'yjIXDjKDRwdsmUKBJLOEiBdZkDpfxSCZ',
      database: 'railway',
      autoLoadEntities: true,
      synchronize: true
    }),
    EmpresasModule,
    CommonModule,
    ProveedoresModule,
    ProductosModule,
    ComprasModule,
    MarcasModule,
    ProductosTiposModule,
    CategoriasModule,
    ProductosStockModule,
    FacturasModule,
    RegistrosModule,
    VentasModule
  ],
  controllers: [],
  providers: [BaseService],
})
export class AppModule { }
