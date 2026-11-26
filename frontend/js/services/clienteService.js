import { api } from "../api.js";

// Regras do lado do front: limpar e validar ANTES de gastar uma requisição.
// O backend valida de novo: nunca confie só no front.
function preparar({ nome, email, telefone, idade }) {
  const dados = {
    nome: (nome ?? "").trim(),
    email: (email ?? "").trim(),
    telefone: (telefone ?? "").replace(/\D/g, ""), // fica só com os dígitos
    idade: (idade ?? "") === "" ? null : Number(idade), // opcional
  };
  if (!dados.nome) throw new Error("Informe o nome.");
  if (!dados.email) throw new Error("Informe o e-mail.");
  if (!/^\S+@\S+\.\S+$/.test(dados.email)) throw new Error("E-mail inválido.");
  if (dados.telefone.length < 10 || dados.telefone.length > 11) {
    throw new Error("O telefone precisa ter DDD + número (10 ou 11 dígitos).");
  }
  if (
    dados.idade !== null &&
    (!Number.isInteger(dados.idade) || dados.idade < 0 || dados.idade > 120)
  ) {
    throw new Error("A idade precisa ser um número inteiro entre 0 e 120.");
  }
  return dados;
}

export const clienteService = {
  listar() {
    return api.get("/clientes");
  },

  async criar(dados) {
    return api.post("/clientes", preparar(dados));
  },

  async atualizar(id, dados) {
    return api.put(`/clientes/${id}`, preparar(dados));
  },

  remover(id) {
    return api.delete(`/clientes/${id}`);
  },
};
