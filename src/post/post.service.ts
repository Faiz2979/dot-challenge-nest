import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtPayloadDto } from "src/dtos/auth.dtos";
import { AllPostsDtoResponse, CreatePostDtoPayload, CreatePostDtoResponse, DeletePostResponse, GetPostByUserDtoResponse, UpdatePostDtoPayload, UpdatePostDtoResponse } from "src/dtos/post.dtos";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PostService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) { }

    // 🔹 Helper method untuk verifikasi & ambil payload
    private async verifyToken(token: string): Promise<JwtPayloadDto> {
        try {
            return await this.jwtService.verifyAsync<JwtPayloadDto>(token, {
                secret: process.env.JWT_SECRET,
            });
        } catch (err) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }

    // 🔹 Buat Post
    async createPost(payload: CreatePostDtoPayload, token: string): Promise<CreatePostDtoResponse> {
        const decoded = await this.verifyToken(token);
        if (payload.title == "" || payload.content == "") {
            throw new NotFoundException('Title or Content cannot be empty');
        }
        const post = await this.prisma.post.create({
            data: {
                title: payload.title,
                content: payload.content,
                userId: decoded.uid,
            },
        });

        return {
            id: post.id,
            statusCode: 201,
            message: 'Post created successfully',
            timestamp: new Date(),
            payload: {
                title: post.title,
                content: post.content,
            },
        };
    }

    // 🔹 Ambil post by user
    async getPostsByUser(
        username: string,
        filter: { page?: number; limit?: number },
    ): Promise<GetPostByUserDtoResponse> {

        // Default nilai pagination
        const page = filter.page && filter.page > 0 ? filter.page : 1;
        const limit = filter.limit && filter.limit > 0 ? filter.limit : 10;
        const skip = (page - 1) * limit;

        // Cari userId berdasarkan username
        const user = await this.prisma.user.findUnique({
            where: { username: username },
            select: { id: true },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Hitung total items
        const totalItems = await this.prisma.post.count({
            where: { userId: user.id },
        });

        // Ambil data
        const posts = await this.prisma.post.findMany({
            where: { userId: user.id },
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' }, // optional, biar lebih rapi
            include: {
                user: {
                    select: { username: true }
                }
            }
        });
        if (posts.length === 0) {
            return {
                statusCode: 200,
                message: 'No posts found for this user',
                timestamp: new Date(),
                payload: [],
                meta: {
                    totalItems: 0,
                    itemCount: 0,
                    itemsPerPage: limit,
                    totalPages: 0,
                    currentPage: page,
                },
            };
        }

        // Map posts to include username and convert dates to string if needed
        const mappedPosts = posts.map(post => ({
            id: post.id,
            username: post.user.username,
            title: post.title,
            content: post.content,
            userId: post.userId,
            createdAt: post.createdAt instanceof Date ? post.createdAt.toISOString() : post.createdAt,
            updatedAt: post.updatedAt instanceof Date ? post.updatedAt.toISOString() : post.updatedAt,
        }));

        return {
            statusCode: 200,
            message: 'Posts retrieved successfully',
            timestamp: new Date(),
            payload: mappedPosts,
            meta: {
                totalItems,
                itemCount: posts.length,
                itemsPerPage: limit,
                totalPages: Math.ceil(totalItems / limit),
                currentPage: page,
            },
        };
    }

    async getAllPosts(filter: { page?: number; limit?: number }): Promise<AllPostsDtoResponse> {
        // Default nilai pagination
        const page = filter.page && filter.page > 0 ? filter.page : 1;
        const limit = filter.limit && filter.limit > 0 ? filter.limit : 10;
        const skip = (page - 1) * limit;


        const posts = await this.prisma.post.findMany({
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit,
            include: {
                user: {
                    select: { username: true }
                }
            }

        });
        const totalItems = posts.length;

        return {
            statusCode: 200,
            message: 'All posts retrieved successfully',
            timestamp: new Date(),
            payload: posts.map(post => ({
                id: post.id,
                username: post.user.username,
                title: post.title,
                content: post.content,
                userId: post.userId,
                createdAt: post.createdAt instanceof Date ? post.createdAt.toISOString() : post.createdAt,
                updatedAt: post.updatedAt instanceof Date ? post.updatedAt.toISOString() : post.updatedAt,
            })),
            meta: {
                totalItems,
                itemCount: posts.length,
                itemsPerPage: totalItems,
                totalPages: 1,
                currentPage: 1,
            },
        };
    }

    async deletePost(postId: string, token: string): Promise<DeletePostResponse> {
        const decoded = await this.verifyToken(token);
        if (!decoded) {
            throw new UnauthorizedException('Invalid User');
        }
        const existingPost = await this.prisma.post.findUnique({
            where: { id: postId, userId: decoded.uid },
        });

        if (!existingPost) {
            throw new NotFoundException('Post not found');
        }
        const post = await this.prisma.post.delete({
            where: { id: postId, userId: decoded.uid },
        });

        return {
            id: post?.id,
            statusCode: 200,
            message: 'Post deleted successfully',
            timestamp: new Date(),
            payload: null,
        }
    }

    async updatePost(postId: string, payload: UpdatePostDtoPayload, token: string): Promise<UpdatePostDtoResponse> {
        const decoded = await this.verifyToken(token);
        if (!decoded) {
            throw new UnauthorizedException('Invalid User');
        }

        const existingPost = await this.prisma.post.findUnique({
            where: { id: postId, userId: decoded.uid },
        });
        if (!existingPost) {
            throw new NotFoundException('Post not found');
        }

        const post = await this.prisma.post.update({
            where: { id: postId, userId: decoded.uid },
            data: payload,
        });

        return {
            id: post?.id,
            statusCode: 200,
            message: 'Post updated successfully',
            timestamp: new Date(),
            payload: {
                title: post.title,
                content: post.content,
            },
        };
    }
}
