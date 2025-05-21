import { IsString, IsBoolean, IsOptional, MaxLength } from 'class-validator';

export class UpdateTodoDto {
  @IsString()
  @IsOptional()
  @MaxLength(100, { message: 'Title cannot exceed 100 characters' })
  title?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500, { message: 'Description cannot exceed 500 characters' })
  description?: string;

  @IsBoolean()
  @IsOptional()
  isDone?: boolean;
}