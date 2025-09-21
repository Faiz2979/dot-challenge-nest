import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { BaseDto, PaginationDto } from "./base.dto";


export class CreatePostDtoPayload {
    @ApiProperty({ example: 'My First Post', description: 'Title of the post' })
    @IsString()
    @IsNotEmpty()
    title: string;
    @ApiProperty({ example: 'This is the content of my first post.', description: 'Content of the post' })
    @IsString()
    @IsNotEmpty()
    content: string;

}

export class CreatePostDtoResponse extends BaseDto<CreatePostDtoPayload> { }

export class UpdatePostDtoPayload {
    @ApiProperty({ example: 'My Updated Post', description: 'Title of the post' })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiProperty({ example: 'This is the updated content of my post.', description: 'Content of the post' })
    @IsOptional()
    @IsString()
    content?: string;
}


export class GetPostByUserDtoResponse extends PaginationDto<PostDto[]> { }

export class AllPostsDtoResponse extends PaginationDto<PostDto[]> { }

export class PostDto {
    @ApiProperty({ example: 'post-id', description: 'Unique identifier for the post' })
    id: string;

    @ApiProperty({ example: 'johndoe', description: 'Username of the post author' })
    username: string;

    @ApiProperty({ example: 'My First Post', description: 'Title of the post' })
    title: string;

    @ApiProperty({ example: 'This is the content of my first post.', description: 'Content of the post' })
    content: string;

    @ApiProperty({ example: 'user-id', description: 'ID of the user who created the post' })
    userId: string;

    @ApiProperty({ example: '2023-01-01T00:00:00Z', description: 'Creation timestamp of the post' })
    createdAt: string;

    @ApiProperty({ example: '2023-01-02T00:00:00Z', description: 'Last update timestamp of the post' })
    updatedAt: string;
}


export class DeletePostResponse extends BaseDto<null> { }
export class UpdatePostDtoResponse extends BaseDto<UpdatePostDtoPayload> { }

