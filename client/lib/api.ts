const BASE_URL = "http://localhost:3001/api";



export async function getTodos() {
  const res = await fetch(`${BASE_URL}/todos`);
  return res.json();
}

export async function createTodo(title: string) {
  const res = await fetch(`${BASE_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return res.json();
}

export async function toggleTodo(id: number, completed: boolean) {
  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
  return res.json();
}

export async function deleteTodo(id: number) {
  const res = await fetch(`${BASE_URL}/todos/${id}`, { method: "DELETE" });
}
