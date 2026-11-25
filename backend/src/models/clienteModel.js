// "Banco de dados" em memória: um array. Depois vira SQLite.
let clientes = [];
let proximoId = 1;

export const clienteModel = {
  listar() {
    return clientes;
  },

  buscarPorId(id) {
    return clientes.find((c) => c.id === id) ?? null;
  },

  existeEmail(email) {
    return clientes.some((c) => c.email === email);
  },

  inserir({ nome, email, telefone, idade }) {
    const novo = {
      id: proximoId++,
      nome,
      email,
      telefone,
      idade: idade ?? null,
    };
    clientes.push(novo);
    return novo;
  },

  atualizar(id, dados) {
    const i = clientes.findIndex((c) => c.id === id);
    if (i === -1) return null;
    clientes[i] = { ...clientes[i], ...dados, id }; // o id nunca muda
    return clientes[i];
  },

  remover(id) {
    const antes = clientes.length;
    clientes = clientes.filter((c) => c.id !== id);
    return clientes.length < antes; // true = removeu
  },
};
