import { agendamentoService } from "../services/agendamentoService.js";

export const agendamentoController = {
  listar(req, res) {
    res.json(agendamentoService.listar(req.query.clienteId));
  },

  buscarPorId(req, res) {
    res.json(agendamentoService.buscarPorId(Number(req.params.id)));
  },

  criar(req, res) {
    const novo = agendamentoService.criar(req.body);
    res.status(201).json(novo);
  },

  atualizar(req, res) {
    res.json(agendamentoService.atualizar(Number(req.params.id), req.body));
  },

  remover(req, res) {
    agendamentoService.remover(Number(req.params.id));
    res.status(204).end();
  },
};
