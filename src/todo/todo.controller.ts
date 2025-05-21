import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/createTodo.dto';
import { UpdateTodoDto } from './dto/updateTodo.dto';
import { TodoItem } from './interface/todoItem.interface';



@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    // Method untuk mendapatkan semua todo
    @Get()
    async findAll(): Promise<TodoItem[]> {
        return this.todoService.findAll();
    }

    @Get(':ID')
    async findByID(@Param('ID') id: string): Promise<TodoItem> {
        return this.todoService.findByID(id);
    }

    @Post()
    async createTodo(@Body() createTodoDto: CreateTodoDto): Promise<TodoItem> {
        return this.todoService.createTodo(createTodoDto);
    }
    
    @Put(':ID')
    async updateTodo(@Param('ID') id: string, @Body() updateTodoDto: UpdateTodoDto): Promise<TodoItem> {
        return this.todoService.updateTodo(+id, updateTodoDto);
    }

    @Delete(':ID')
    async deleteTodo(@Param('ID') id: string): Promise<void> {
        await this.todoService.deleteTodo(id);
    }
}
