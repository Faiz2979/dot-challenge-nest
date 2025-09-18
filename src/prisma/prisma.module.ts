import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // supaya bisa dipakai di semua module tanpa perlu import lagi
@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})
export class PrismaModule { }
