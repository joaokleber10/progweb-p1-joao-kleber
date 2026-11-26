import express from "express";
import cors from "cors";
import clientesRouter from "./routes/clientes.js";
import agendamentosRouter from "./routes/agendamentos.js";
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5500", "http://217.70.168.132:5500"],
  }),
);

// --- Middleware global (antes das rotas) ---
app.use(express.json()); // lê o body JSON para req.body
app.use(logger); // loga toda requisição

// --- Health check ---
app.get("/", (req, res) => {
  res.json({
    api: "Barbearia API",
    versao: "1.0.0",
    rotas: ["/clientes", "/agendamentos"],
  });
});

// --- Rotas ---
app.use("/clientes", clientesRouter);
app.use("/agendamentos", agendamentosRouter);

// --- 404 para rotas que não existem ---
app.use((req, res) => {
  res.status(404).json({ erro: `Rota ${req.method} ${req.url} não existe` });
});

// --- Tratador de erro: SEMPRE o último ---
app.use(errorHandler);

export default app;
