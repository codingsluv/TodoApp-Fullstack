import { useEffect, useState } from "react";
import type { CreateTodoDto, Todo, UpdateTodoDto } from "../interface/Todo";

interface TodoFormsProps {
    initialTodo?: Todo | null;
    onSubmit: (todo: CreateTodoDto | UpdateTodoDto) => void;
    onCancel: () => void;
}

export default function TodoForm({initialTodo, onSubmit, onCancel}: TodoFormsProps) {
    const [title, setTitle] = useState(initialTodo?.title || '')
    const [description, setDescription] = useState(initialTodo?.description || '');

    useEffect(() => {
        if (initialTodo) {
        setTitle(initialTodo.title);
        setDescription(initialTodo.description || '');
        } else {
        setTitle('');
        setDescription('');
        }
    }, [initialTodo]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) {
        alert('Title cannot be empty');
        return;
        }

        if (initialTodo) {
        const updateData: UpdateTodoDto = { title, description, isDone: initialTodo.isDone };
        onSubmit(updateData);
        } else {
        const createData: CreateTodoDto = { title, description };
        onSubmit(createData);
        }
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 mb-5 border border-gray-300 rounded-lg shadow-sm bg-gray-50">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">{initialTodo ? 'Edit Todo' : 'Add New Todo'}</h3>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description (Optional):</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
          ></textarea>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition-colors duration-200"
          >
            {initialTodo ? 'Update Todo' : 'Add Todo'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    )
}