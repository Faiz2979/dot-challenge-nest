import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { PostController } from './post/post.controller';
import { PostModule } from './post/post.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [PostModule, AuthModule, PrismaModule],
  controllers: [AppController, AuthController, PostController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
