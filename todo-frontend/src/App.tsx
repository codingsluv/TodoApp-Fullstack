import { useEffect, useState } from "react";
import { createTodo, deleteTodo, getTodos, updateTodo } from "./api/todo";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import type { CreateTodoDto, Todo, UpdateTodoDto } from "./interface/Todo";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null); // State untuk todo yang sedang diedit

  // Mengambil daftar todo saat komponen dimuat pertama kali
  useEffect(() => {
    fetchTodos();
  }, []);

  // Fungsi untuk mengambil semua todo dari API
  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      console.error('Failed to fetch todos:', err);
      setError('Failed to load todos. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk menambah atau memperbarui todo
  const handleAddOrUpdateTodo = async (formData: CreateTodoDto | UpdateTodoDto) => {
    setError(null);
    try {
      if (editingTodo) {
        // Mode Update: panggil fungsi update API
        await updateTodo(editingTodo.id, formData as UpdateTodoDto);
        setEditingTodo(null); // Reset mode edit setelah update
      } else {
        // Mode Tambah: panggil fungsi create API
        await createTodo(formData as CreateTodoDto);
      }
      fetchTodos(); // Refresh daftar todo setelah operasi
    } catch (err: any) {
      console.error('Failed to save todo:', err);
      setError(`Failed to save todo: ${err.response?.data?.message || err.message}`);
    }
  };

  // Fungsi untuk mengubah status "done" pada todo
  const handleToggleDone = async (id: number, isDone: boolean) => {
    setError(null);
    try {
      // Update state secara optimis untuk respons UI yang lebih cepat
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === id ? { ...todo, isDone: isDone } : todo
        )
      );

      // Kirim permintaan ke API
      const todo = todos.find(t => t.id === id);
      if (todo) {
        await updateTodo(id, { title: todo.title, isDone });
      }
    } catch (err: any) {
      console.error('Failed to toggle todo status:', err);
      setError(`Failed to update todo status: ${err.response?.data?.message || err.message}`);
      // Jika terjadi error, kembalikan state ke kondisi awal dengan me-refresh dari API
      fetchTodos();
    }
  };

  // Fungsi untuk menghapus todo
  const handleDeleteTodo = async (id: number) => {
    setError(null);
    try {
      // Update state secara optimis
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
      await deleteTodo(id);
    } catch (err: any) {
      console.error('Failed to delete todo:', err);
      setError(`Failed to delete todo: ${err.response?.data?.message || err.message}`);
      // Jika terjadi error, kembalikan state ke kondisi awal
      fetchTodos();
    }
  };

  // Fungsi untuk memulai mode edit pada todo tertentu
  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
  };

  // Fungsi untuk membatalkan mode edit
  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  return (
    <div className="max-w-xl mx-auto my-5 p-5 border border-gray-200 rounded-lg shadow-md bg-white">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Todo List App</h1>
      {/* Memanggil komponen TodoForm */}
      <TodoForm
        initialTodo={editingTodo} // Meneruskan todo yang sedang diedit (jika ada)
        onSubmit={handleAddOrUpdateTodo} // Callback saat form disubmit
        onCancel={handleCancelEdit} // Callback saat tombol cancel ditekan
      />
      {/* Memanggil komponen TodoList */}
      <TodoList
        todos={todos} // Meneruskan daftar todo
        onToggleDone={handleToggleDone} // Callback saat checkbox diganti
        onEdit={handleEdit} // Callback saat tombol edit ditekan
        onDelete={handleDeleteTodo} // Callback saat tombol delete ditekan
        loading={loading} // Status loading untuk menampilkan indikator
        error={error} // Pesan error jika ada
      />
    </div>
  );

}