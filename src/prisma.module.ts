import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // <--- 1. ทำให้ใช้ได้ทั่วโปรเจกต์โดยไม่ต้อง Import ซ้ำ
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // <--- 2. ส่งออก Service ให้คนอื่นใช้
})
export class PrismaModule {}