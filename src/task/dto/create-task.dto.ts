import { IsString, IsNumber, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
// import { TaskStatus, TaskPriority } from 'generated/prisma/enums';
// import { TaskStatus, TaskPriority } from '../../../generated/prisma/client';
export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  boardId: number;

  // @IsEnum(TaskStatus)
  // @IsOptional() // หรือ @IsNotEmpty() ถ้าบังคับว่าต้องมี
  // status?: TaskStatus;

  // @IsEnum(TaskPriority)
  // priority?: TaskPriority;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
