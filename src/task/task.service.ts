import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}
  async create(createTaskDto: CreateTaskDto) {
    try {
      const result = await this.prisma.task.create({ data: createTaskDto });
      if (result) return { info: 'บันทึกข้อมูลสำเร็จ!' };
    } catch (error) {
      console.error('เกิดข้อผิดพลาด', error);
      throw error;
    }
  }

  async findAll() {
    const result = await this.prisma.board.findMany();
    if (result.length > 0) {
      return result;
    } else {
      console.log('ไม่พบข้อมูล Board');
      return [];
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.prisma.board.findUnique({ where: {id}})
      if(result) return result;
    } catch (error) {
      console.error("เกิดข้อผิดพลาด",error)
      throw error
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    try {
      const result = await this.prisma.board.update({
        where: { id },
        data: updateTaskDto,
      });
      if (result) return { info: 'อัปเดตข้อมูลสำเร็จ' };
    } catch (error) {
      console.error('เกิดข้อผิดพลาด', error);
      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
