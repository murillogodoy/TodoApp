import { Router } from "express";
import pool from "../db/index.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM todos ORDER BY created_at DESC",
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar tarefas" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: "O título é obrigatório" });
    }

    const result = await pool.query(
      "INSERT INTO todos (title) VALUES ($1) RETURNING *",
      [title],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar tarefa" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const result = await pool.query(
      "UPDATE todos SET completed = ($1) WHERE id = ($2) RETURNING *",
      [completed, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar tarefa" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM todos WHERE id = ($1) RETURNING *",
      [id],
    );

    if (result.rows === 0) {
      return res.status(404).json({ error: "Tarefa não encontrada " });
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao deletar tarefa" });
  }
});

export default router;
