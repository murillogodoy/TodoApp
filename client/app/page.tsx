"use client";

import { useState, useEffect } from "react";
import { Todo, getTodos, createTodo, toggleTodo, deleteTodo } from "../lib/api";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

export default function Page() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getTodos().then((data) => {
      setTodos(data);
      setLoading(false);
    });
  }, []);

  async function handleAdd(title: string): Promise<void> {
    const newTask = await createTodo(title);
    setTodos(prev => [newTask, ...prev]);
  }

  async function handleToggle(id: number, completed: boolean): Promise<void> {
    const updated = await toggleTodo(id, completed);
    setTodos(prev => prev.map(t => t.id === id ? updated : t));
  }

  async function handleDelete(id: number): Promise<void> {
    await deleteTodo(id);
    setTodos(prev => prev.filter(t => t.id !== id));
  }

  if (loading) return <p>Loading...</p>

  return (
    <main>
        <h1>My Tasks</h1>
        <TodoForm onAdd={handleAdd} />
        <TodoList
            todos={todos}
            onToggle={handleToggle}
            onDelete={handleDelete}
        />
    </main>
  );
}
