import type { Todo } from "../interface/Todo"

interface TodoItemProps {
    todo: Todo;
    onToggleDone: (id: number, done: boolean) => void;
    onEdit: (todo: Todo) => void;
    onDelete: (id: number) => void
}

export default function TodoItem({todo, onToggleDone, onEdit, onDelete}: TodoItemProps) {
    return (
        <div
        className={`flex items-center justify-between p-3 my-2 border border-gray-300 rounded-md shadow-sm transition-colors duration-200 ${
          todo.isDone ? 'bg-green-50' : 'bg-white'
        }`}
      >
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={todo.isDone}
            onChange={() => onToggleDone(todo.id, !todo.isDone)}
            className="mr-3 w-5 h-5 accent-blue-500 cursor-pointer"
          />
          <div>
            <h3 className={`text-lg font-semibold ${todo.isDone ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {todo.title}
            </h3>
            {todo.description && (
              <p className="text-sm text-gray-600 mt-1">
                {todo.description}
              </p>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(todo)}
            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    )
}