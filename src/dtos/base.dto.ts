
// children can extend this class
export class BaseDto<T = any> {
    id?: string;
    message: string;
    payload?: T;
    statusCode: number;
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