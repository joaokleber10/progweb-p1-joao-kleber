let agendamentos = [];
let proximoId = 1;

export const agendamentoModel = {
  listar() {
    return agendamentos;
  },

  listarPorCliente(clienteId) {
    return agendamentos.filter((a) => a.clienteId === clienteId);
  },

  buscarPorId(id) {
    return agendamentos.find((a) => a.id === id) ?? null;
  },

  inserir({ horario, clienteId }) {
    const novo = {
      id: proximoId++,
      horario: new Date(horario).toISOString(),
      clienteId: Number(clienteId),
      status: "agendado",
      justificativaFalta: null,
      criadoEm: new Date().toISOString(),
    };
    agendamentos.push(novo);
    return novo;
  },

  atualizar(id, dados) {
    const i = agendamentos.findIndex((a) => a.id === id);
    if (i === -1) return null;
    agendamentos[i] = { ...agendamentos[i], ...dados, id };
    return agendamentos[i];
  },

  remover(id) {
    const antes = agendamentos.length;
    agendamentos = agendamentos.filter((a) => a.id !== id);
    return agendamentos.length < antes;
  },
};
