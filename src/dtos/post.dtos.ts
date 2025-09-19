import { IsNotEmpty, IsOptional, IsString } from "class-validator";
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
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    content?: string;
}


export class GetPostByUserDtoResponse extends PaginationDto<PostDto[]> { }

export class AllPostsDtoResponse extends PaginationDto<PostDto[]> { }
export class PostDto {
    id: string;
    username: string;
    title: string;
    content: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export class DeletePostResponse extends BaseDto<null> { }
export class UpdatePostDtoResponse extends BaseDto<UpdatePostDtoPayload> { }

