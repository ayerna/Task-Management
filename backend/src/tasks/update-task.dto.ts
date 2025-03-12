// tasks/dto/update-task.dto.ts
import { IsOptional, IsString, IsEnum } from 'class-validator';
import { TaskStatus } from './schemas/task.schema';

export class UpdateTaskDto {
  @IsString()
  title?: string;

  @IsString()
  description?: string;

  @IsString()
  status?: TaskStatus;
}
