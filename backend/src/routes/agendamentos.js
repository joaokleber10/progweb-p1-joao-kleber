import { Router } from "express";
import { agendamentoController } from "../controllers/agendamentoController.js";

const router = Router();

router.get("/", agendamentoController.listar);
router.get("/:id", agendamentoController.buscarPorId);
router.post("/", agendamentoController.criar);
router.put("/:id", agendamentoController.atualizar);
router.delete("/:id", agendamentoController.remover);

export default router;
