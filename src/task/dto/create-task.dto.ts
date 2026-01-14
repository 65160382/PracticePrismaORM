import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';
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
}
