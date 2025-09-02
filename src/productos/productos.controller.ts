import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, ValidationPipe, UsePipes, Put, ParseIntPipe, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CrearProductoDto } from './dto/create-producto.dto';
import { EditarProductoDto } from './dto/update-producto.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

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
    @UsePipes(ValidationPipe)
    crearProducto(@Body() nuevoProducto: CrearProductoDto) {
        return this.productosService.crear(nuevoProducto);
    }

    @Post('upload-multiple')
    @UseInterceptors(
        FilesInterceptor('imagenes', 10, {
            storage: diskStorage({
                destination: './uploads',
                filename: (_, file, cb) => {
                    const filename = uuidv4() + '_' + file.originalname;
                    cb(null, filename);
                },
            }),
            fileFilter: (_, file, cb) => {
                if (!file.mimetype.startsWith('image/')) {
                    return cb(new Error('Solo se permiten imágenes'), false);
                }
                cb(null, true);
            },
        }),
    )
    async uploadMultiple(@UploadedFiles() files: Express.Multer.File[]) {
        // Cambiamos a URLs absolutas apuntando al backend
        const urls = files.map(
            file => `http://localhost:3000/uploads/${file.filename}`
        );
        return { urls };
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
