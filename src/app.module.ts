import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { PostController } from './post/post.controller';

@Module({
  imports: [PostModule, UsersModule, AuthModule, PrismaModule],
  controllers: [AppController, AuthController, PostController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
