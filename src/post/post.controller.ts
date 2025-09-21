import { Body, Controller, Delete, Get, Headers, Param, Patch, Post, Query, UnauthorizedException } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiResponseWithBase, ApiResponseWithPagination } from 'src/common/swagger-response-decorator';
import { BaseDto } from 'src/dtos/base.dto';
import { CreatePostDtoPayload, CreatePostDtoResponse, PostDto, UpdatePostDtoPayload } from '../dtos/post.dtos';
import { PostService } from './post.service';


@ApiTags('Posts')
@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @Post("create-post")
    @ApiHeader({ name: 'authorization', description: 'Bearer <token>' })
    @ApiBody({ type: CreatePostDtoPayload })
    @ApiResponseWithBase(CreatePostDtoPayload)
    async createPost(
        @Body() payload: CreatePostDtoPayload,
        @Headers('authorization') authHeader: string,
    ): Promise<CreatePostDtoResponse> {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Missing or invalid authorization header');
        }

        const token = authHeader.replace('Bearer ', '').trim();

        return this.postService.createPost(payload, token);
    }

    @Get('user-posts/:username')
    @ApiParam({ name: 'username', description: 'Username of the user whose posts to retrieve', example: 'johndoe' })
    @ApiQuery({ name: 'page', required: false, description: 'Page number for pagination', example: 1 })
    @ApiResponseWithPagination(PostDto)
    async getPostsByUser(
        @Param('username') username: string,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ) {



        return this.postService.getPostsByUser(username, {
            page: page ? parseInt(page, 10) : 1,
            limit: limit ? parseInt(limit, 10) : 10,
        });
    }

    @Get('')
    @ApiQuery({ name: 'page', required: false, description: 'Page number for pagination', example: 1 })
    @ApiResponseWithPagination(PostDto)
    async getAllPosts(
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ) {
        return this.postService.getAllPosts({
            page: page ? parseInt(page, 10) : 1,
            limit: limit ? parseInt(limit, 10) : 10,
        });
    }

    @Delete(':postId')
    @ApiHeader({ name: 'authorization', description: 'Bearer <token>' })
    @ApiParam({ name: 'postId', description: 'ID of the post to delete', example: 'post-id-to-delete' })
    @ApiOkResponse({ description: 'Post deleted successfully', type: BaseDto })
    async deletePost(@Param('postId') postId: string, @Headers('authorization') authHeader: string) {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Missing or invalid authorization header');
        }

        const token = authHeader.replace('Bearer ', '').trim();

        return this.postService.deletePost(postId, token);
    }

    @Patch(':postId')
    @ApiHeader({ name: 'authorization', description: 'Bearer <token>' })
    @ApiParam({ name: 'postId', description: 'ID of the post to update', example: 'post-id-to-update' })
    @ApiBody({ type: UpdatePostDtoPayload })
    @ApiResponseWithBase(UpdatePostDtoPayload)
    async updatePost(
        @Param('postId') postId: string,
        @Body() payload: UpdatePostDtoPayload,
        @Headers('authorization') authHeader: string,
    ) {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Missing or invalid authorization header');
        }
        const token = authHeader.replace('Bearer ', '').trim();

        return this.postService.updatePost(postId, payload, token);
    }
}
