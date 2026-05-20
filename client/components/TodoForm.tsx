import { SubmitEvent, useState } from "react";

interface Props {
  onAdd: (title: string) => Promise<void>;
}

export default function TodoForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    await onAdd(title);
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nova tarefa..."
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}
