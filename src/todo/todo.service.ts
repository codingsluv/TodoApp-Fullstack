import { Body, Delete, Get, Injectable, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { TodoItem } from './interface/todoItem.interface';
import { UpdateTodoDto } from './dto/updateTodo.dto';

// Service untuk proses bisnis logic Todo
@Injectable()
export class TodoService {
    private todos: TodoItem[] = [];
    private nextID: number = 1;

    async findAll(): Promise<TodoItem[]> {
        // simulasi delay database
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.todos);
            }, 100);
        });
    }

    async findByID(id: string): Promise<TodoItem> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const todo = this.todos.find((todo) => todo.id === parseInt(id));
                if (!todo) {
                    reject(new NotFoundException('Todo not found'));
                } else {
                    resolve(todo);
                }
            }, 100);
        });
    }

    async createTodo(todo: Omit<TodoItem, 'id' | 'isDone'>): Promise<TodoItem> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newTodo: TodoItem = {
                    id: this.nextID++,
                    isDone: false,
                    ...todo,
                };
                this.todos.push(newTodo);
                resolve(newTodo);
            }, 100);
        });
    }

    async updateTodo(id: number, updateTodoDto: UpdateTodoDto): Promise<TodoItem> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = this.todos.findIndex((todo) => todo.id === id);
                if (index === -1) {
                    reject(new NotFoundException('Todo not found'));
                } else {
                    this.todos[index] = {
                        ...this.todos[index],
                        ...updateTodoDto,
                    };
                    resolve(this.todos[index]);
                }
            }, 100);
        });
    }

    async deleteTodo(id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = this.todos.findIndex((todo) => todo.id === parseInt(id));
                if (index === -1) {
                    reject(new NotFoundException('Todo not found'));
                } else {
                    this.todos.splice(index, 1);
                    resolve();
                }
            }, 100);
        });
    }
}
