import { db } from "../db.js";

// Mesmo contrato da S3 (listar, buscarPorId, existeEmail, inserir,
// atualizar, remover). Só o "como" mudou: o array virou tabela.
export const clienteModel = {
  listar() {
    return db.prepare("SELECT * FROM cliente ORDER BY id").all();
  },

  buscarPorId(id) {
    return db.prepare("SELECT * FROM cliente WHERE id = ?").get(id) ?? null;
  },

  existeEmail(email) {
    const linha = db
      .prepare("SELECT 1 FROM cliente WHERE email = ?")
      .get(email);
    return linha !== undefined;
  },

  inserir({ nome, email, telefone, idade }) {
    const r = db
      .prepare(
        "INSERT INTO cliente (nome, email, telefone, idade) VALUES (?, ?, ?, ?)",
      )
      .run(nome, email, telefone, idade ?? null);
    return this.buscarPorId(r.lastInsertRowid);
  },

  atualizar(id, dados) {
    const atual = this.buscarPorId(id);
    if (!atual) return null;
    const novo = { ...atual, ...dados };
    db.prepare(
      "UPDATE cliente SET nome = ?, email = ?, telefone = ?, idade = ? WHERE id = ?",
    ).run(novo.nome, novo.email, novo.telefone, novo.idade ?? null, id); // o id nunca muda
    return this.buscarPorId(id);
  },

  remover(id) {
    const r = db.prepare("DELETE FROM cliente WHERE id = ?").run(id);
    return r.changes > 0; // true = removeu
  },
};
