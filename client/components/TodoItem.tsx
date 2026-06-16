import { Todo } from "../lib/api";

interface Props {
  todo: Todo;
  onToggle: (id: number, completed: boolean) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id, !todo.completed)}
      />
      <span>{todo.title}</span>
      <button
        onClick={() => {
          onDelete(todo.id);
        }}
      >
        Delete
      </button>
    </li>
  );
}
