import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, ValidationPipe, UsePipes, Put, ParseIntPipe, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CrearProductoDto } from './dto/create-producto.dto';
import { EditarProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('productos')
export class ProductosController {
    constructor(private readonly productosService: ProductosService) { }

    @Get()
    obtenerTodosLosProductos() {
        return this.productosService.obtenerTodos();
    }

    @Get(':id')
    obtenerProductoPorId(@Param('id', ParseUUIDPipe) id: string) {
        return this.productosService.obtenerPorId(id);
    }

    @Get('codigo-barra/:codigoBarra')
    obtenerProductoPorCodigoBarra(@Param('codigoBarra') codigoBarra: string) {
        return this.productosService.obtenerPorCodigoBarra(codigoBarra);
    }

    @Post()
    @UseInterceptors(
        FileFieldsInterceptor([{ name: 'imagenes', maxCount: 10 }], {
            storage: diskStorage({
                destination: './uploads/productos',
                filename: (req, file, cb) => {
                    const nombreArchivo = `${Date.now()}-${Math.round(
                        Math.random() * 1e9,
                    )}${extname(file.originalname)}`;
                    cb(null, nombreArchivo);
                },
            }),
        }),
    )
    @UsePipes(ValidationPipe)
    async crearProducto(
        @UploadedFiles() files: { imagenes?: Express.Multer.File[] },
        @Body() data: CrearProductoDto,
    ): Promise<Producto> {
        const imagenes = files?.imagenes?.map((f) => `/uploads/productos/${f.filename}`) || [];
        return this.productosService.crear({
            ...data,
            Imagenes: imagenes,
        });
    }

    @Patch(':id')
    ReactivarProducto(@Param('id', ParseUUIDPipe) id: string) {
        return this.productosService.reactivar(id);
    }

    @Put(':id')
    editarProducto(@Body() proveedor: EditarProductoDto, @Param('id', ParseUUIDPipe) id: string) {
        return this.productosService.editar(proveedor, id);
    }

    @Put('editar-precio/:tipo/:id')
    editarPrecio(
        @Param('tipo') tipo: 'COMPRA' | 'VENTA',
        @Param('id', ParseUUIDPipe) id: string,
        @Body('nuevoPrecio', ParseIntPipe) nuevoPrecio: number
    ) {
        return this.productosService.editarPrecio(nuevoPrecio, id, tipo);
    }

    @Delete(':id')
    eliminarProducto(@Param('id', ParseUUIDPipe) id: string) {
        return this.productosService.eliminar(id);
    }
}
