import axios from 'axios';
import type { CreateTodoDto, Todo, UpdateTodoDto } from '../interface/Todo';



const API_URL = 'http://localhost:3000/todo'

export const getTodos = async (): Promise<Todo[]> => {
    const response = await axios.get<Todo[]>(API_URL)
    return response.data
}

export const getTodoByID = async (id:number): Promise<Todo> => {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data
}

export const createTodo = async (todo: CreateTodoDto): Promise<Todo> => {
    const response = await axios.post<Todo>(API_URL, todo)
    return response.data
}

export const updateTodo = async (id: number, todo: UpdateTodoDto): Promise<Todo> => {
    const response = await axios.put<Todo>(`${API_URL}/${id}`, todo)
    return response.data
}

export const deleteTodo = async (id:number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`)
}