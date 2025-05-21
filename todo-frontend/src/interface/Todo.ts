export interface Todo {
    id: number
    title: string
    description?: string
    isDone: boolean
}

export interface CreateTodoDto {
    title: string
    description?: string
}

export interface UpdateTodoDto {
    title: string
    description?: string
    isDone: boolean
}