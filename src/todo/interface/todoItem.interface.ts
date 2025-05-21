// Interface untuk represntasi todo
export interface TodoItem {
    id: number;
    title: string;
    description?: string;
    isDone: boolean;
}