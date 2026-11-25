import { agendamentoModel } from "../models/agendamentoModel.js";
import { clienteModel } from "../models/clienteModel.js";
import { erro } from "../utils/erro.js";

export const agendamentoService = {
  listar(clienteId) {
    if (clienteId) return agendamentoModel.listarPorCliente(Number(clienteId));
    return agendamentoModel.listar();
  },

  buscarPorId(id) {
    const agendamento = agendamentoModel.buscarPorId(id);
    if (!agendamento) throw erro(404, "Agendamento não encontrado");
    return agendamento;
  },

  criar({ horario, clienteId } = {}) {
    // Regra 1: horario e clienteId são obrigatórios
    if (!horario || !clienteId) {
      throw erro(400, 'Campos "horario" e "clienteId" são obrigatórios');
    }
    // Regra 2: horario precisa ser uma data/hora válida
    if (Number.isNaN(new Date(horario).getTime())) {
      throw erro(
        400,
        'Campo "horario" deve ser uma data/hora válida (ex.: 2026-12-01T14:30:00)',
      );
    }
    // Regra 3: o cliente precisa existir
    if (!clienteModel.buscarPorId(Number(clienteId))) {
      throw erro(422, "Cliente informado não existe");
    }
    return agendamentoModel.inserir({ horario, clienteId });
  },

  atualizar(id, dados = {}) {
    const atualizado = agendamentoModel.atualizar(id, dados);
    if (!atualizado) throw erro(404, "Agendamento não encontrado");
    return atualizado;
  },

  remover(id) {
    const removido = agendamentoModel.remover(id);
    if (!removido) throw erro(404, "Agendamento não encontrado");
  },
};
