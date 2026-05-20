import "dotenv/config";
import express from "express";
import cors from "cors";
import pool from "./db/index.js";
import todosRouter from "./routes/todos.js";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.use("/api/todos", todosRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
