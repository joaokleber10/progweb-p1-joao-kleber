import { clienteModel } from "../models/clienteModel.js";
import { erro } from "../utils/erro.js";

export const clienteService = {
  listar() {
    return clienteModel.listar();
  },

  buscarPorId(id) {
    const cliente = clienteModel.buscarPorId(id);
    if (!cliente) throw erro(404, "Cliente não encontrado");
    return cliente;
  },

  criar({ nome, email, telefone, idade } = {}) {
    // Regra 1: nome, email e telefone são obrigatórios
    if (!nome || !email || !telefone) {
      throw erro(400, 'Campos "nome", "email" e "telefone" são obrigatórios');
    }
    // Regra 2: email é único
    if (clienteModel.existeEmail(email)) {
      throw erro(409, "Já existe um cliente com este email");
    }
    return clienteModel.inserir({ nome, email, telefone, idade });
  },

  atualizar(id, dados = {}) {
    const atualizado = clienteModel.atualizar(id, dados);
    if (!atualizado) throw erro(404, "Cliente não encontrado");
    return atualizado;
  },

  remover(id) {
    const removido = clienteModel.remover(id);
    if (!removido) throw erro(404, "Cliente não encontrado");
  },
};
