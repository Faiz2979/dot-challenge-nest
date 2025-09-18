import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { BaseDto } from "./base.dto";


class CreatePostDtoPayload {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    @IsNotEmpty()
    authorId: string;

    @IsDate()
    @IsNotEmpty()
    createdAt: Date;
}

class CreatePostDto extends BaseDto<CreatePostDtoPayload> { }

class UpdatePostDtoPayload {
    @IsString()
    title?: string;

    @IsString()
    content?: string;

}

class UpdatePostDto extends BaseDto<UpdatePostDtoPayload> { }

export { CreatePostDto as PostDto };
