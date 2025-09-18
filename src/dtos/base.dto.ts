
// children can extend this class
export class BaseDto<T = any> {
    id: string;
    statusCode: number;
    message: string;
    timestamp: Date;
    payload?: T;
}