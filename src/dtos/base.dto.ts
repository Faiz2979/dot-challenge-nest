
import { ApiProperty } from '@nestjs/swagger';

// children can extend this class
export class BaseDto<T = any> {
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
    id?: string;

    @ApiProperty({ example: 'returned message' })
    message: string;

    @ApiProperty({ type: Object }) // placeholder, nanti dioverride
    payload?: T;

    @ApiProperty({ example: 201 })
    statusCode: number;

    @ApiProperty({ type: String, format: 'date-time', example: new Date().toISOString() })
    timestamp: Date;
}


export class MetaDto {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}

export class PaginationDto<T = any> extends BaseDto<T> {
    meta: MetaDto;
}