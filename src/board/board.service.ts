import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BoardService {
  constructor(private prisma: PrismaService) {}
  async create(createBoardDto: CreateBoardDto) {
    await this.prisma.board.create({ data: createBoardDto });
    return { info: 'บันทึกข้อมูลสำเร็จ!' };
  }

  async findAll() {
    try {
      const result = await this.prisma.board.findMany();
      if (result.length > 0) { 
      return result;
    } else {
      console.log("ไม่พบข้อมูล Board"); 
      return []; 
    }
    } catch (error) {
      console.error("เกิดข้อผิดพลาด",error)
      throw error;
    }
    
  }

  findOne(id: number) {
    return this.prisma.board.findUnique({ where: { id } });
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return this.prisma.board.update({ where: { id }, data: updateBoardDto });
  }

  remove(id: number) {
    return this.prisma.board.delete({ where: { id } });
  }
}
