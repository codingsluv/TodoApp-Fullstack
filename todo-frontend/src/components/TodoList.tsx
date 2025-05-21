import type { Todo } from "../interface/Todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
    todos: Todo[];
    onToggleDone: (id: number, done: boolean) => void;
    onEdit: (todo: Todo) => void;
    onDelete: (id: number) => void;
    loading: boolean;
    error: string | null
}

export default function TodoList({todos, onToggleDone, onEdit, onDelete, loading, error}: TodoListProps) {
    if (loading) {
        return <p className="text-center text-lg text-blue-600">Loading todos...</p>;
      }
    
      if (error) {
        return <p className="text-center text-lg text-red-500">Error: {error}</p>;
      }
    
      if (todos.length === 0) {
        return <p className="text-center text-lg text-gray-600">No todos found. Add a new one!</p>;
      }
    return (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Todos</h2>
            <div className="space-y-3"> {/* Memberikan jarak antar item todo */}
                {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggleDone={onToggleDone}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
                ))}
            </div>
      </div>
    )
}