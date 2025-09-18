import { IsNotEmpty, IsString } from "class-validator";
import { BaseDto, PaginationDto } from "./base.dto";


export class CreatePostDtoPayload {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

}

export class CreatePostDtoResponse extends BaseDto<CreatePostDtoPayload> { }

export class UpdatePostDtoPayload {
    @IsString()
    title?: string;

    @IsString()
    content?: string;
}

export class GetPostByUserDtoResponse extends PaginationDto<any[]> { }

export class UpdatePostDtoResponse extends BaseDto<UpdatePostDtoPayload> { }

