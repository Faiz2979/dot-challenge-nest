import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtPayloadDto } from "src/dtos/auth.dtos";
import { CreatePostDtoPayload, CreatePostDtoResponse, GetPostByUserDtoResponse } from "src/dtos/post.dtos";
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
            return {
                // id: null,
                statusCode: 404,
                message: 'User not found',
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

        return {
            statusCode: 200,
            message: 'Posts retrieved successfully',
            timestamp: new Date(),
            payload: posts,
            meta: {
                totalItems,
                itemCount: posts.length,
                itemsPerPage: limit,
                totalPages: Math.ceil(totalItems / limit),
                currentPage: page,
            },
        };
    }


    // 🔹 Kalau memang butuh decode manual
    async decodeToken(token: string): Promise<JwtPayloadDto> {
        return this.verifyToken(token);
    }
}
