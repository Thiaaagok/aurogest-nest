import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express';

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
    catch(exception: QueryFailedError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const err: any = exception;

        const errorMessages: { [key: string]: string } = {
            '23505': 'Ya existe un registro con este valor único.',
            '23503': 'El valor de una clave foránea no es válido.',
            '23502': 'Faltan campos obligatorios.',
            '22001': 'Un texto es demasiado largo para el campo.',
            '23514': 'El valor de un campo no cumple una restricción.',
            '42703': 'Uno de los campos enviados no existe.',
            '42P01': 'La tabla no existe en la base de datos.',
            '22003': 'Un número es demasiado grande o pequeño.',
            '42804': 'El tipo de dato enviado no coincide con el requerido.',
            '22007': 'Formato de fecha/hora inválido.',
            '0A000': 'La operación no está soportada por la base de datos.',
            '22012': 'No se puede dividir por cero.',
            '40001': 'Conflicto de concurrencia, intentá nuevamente.',
            '42501': 'Permisos insuficientes para realizar esta operación.',
        };

        const message = errorMessages[err.code] || 'Error en la base de datos';

        response.status(400).json({
            statusCode: 400,
            message,
            error: err.detail || err.message,
        });
    }
}