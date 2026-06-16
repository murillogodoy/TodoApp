import { Todo } from "@/lib/api";
import TodoItem from "./TodoItem";

interface Props {
  todos: Todo[];
  onToggle: (id: number, completed: boolean) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export default function TodoList({ todos, onToggle, onDelete }: Props) {
  if (todos.length === 0) return <p>No tasks yet.</p>;

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
