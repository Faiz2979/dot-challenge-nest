import { Body, Controller, Delete, Get, Headers, Param, Patch, Post, Query, UnauthorizedException } from '@nestjs/common';
import { CreatePostDtoPayload, CreatePostDtoResponse, UpdatePostDtoPayload } from 'src/dtos/post.dtos';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @Post("create-post")
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

    @Get()
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
    async deletePost(@Param('postId') postId: string, @Headers('authorization') authHeader: string) {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Missing or invalid authorization header');
        }

        const token = authHeader.replace('Bearer ', '').trim();

        return this.postService.deletePost(postId, token);
    }

    @Patch(':postId')
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
