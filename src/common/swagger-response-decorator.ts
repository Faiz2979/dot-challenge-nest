import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { BaseDto, MetaDto, PaginationDto } from '../dtos/base.dto';

/**
 * Helper untuk bikin response schema berbasis BaseDto<T>
 * @param model DTO payload yang akan dipakai
 */
export const ApiResponseWithBase = <TModel extends Type<any>>(model: TModel) => {
    return applyDecorators(
        ApiExtraModels(BaseDto, model),
        ApiOkResponse({
            schema: {
                allOf: [
                    { $ref: getSchemaPath(BaseDto) },
                    {
                        properties: {
                            payload: { $ref: getSchemaPath(model) },
                        },
                    },
                ],
            },
        }),
    );
};

/**
 * Untuk response dengan PaginationDto<T[]>
 */
export const ApiResponseWithPagination = <TModel extends Type<any>>(model: TModel) => {
    return applyDecorators(
        ApiExtraModels(PaginationDto, BaseDto, MetaDto, model),
        ApiOkResponse({
            schema: {
                allOf: [
                    { $ref: getSchemaPath(PaginationDto) },
                    {
                        properties: {
                            payload: {
                                type: 'array',
                                items: { $ref: getSchemaPath(model) },
                            },
                            meta: { $ref: getSchemaPath(MetaDto) },
                        },
                    },
                ],
            },
        }),
    );
};