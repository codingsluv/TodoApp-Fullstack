import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty({ message: 'Title cannot be empty' })
  @MaxLength(100, { message: 'Title cannot exceed 100 characters' })
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(500, { message: 'Description cannot exceed 500 characters' })
  description?: string;
}