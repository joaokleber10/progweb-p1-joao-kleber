import { db } from "../db.js";

// Mesmo contrato da S3 (listar, listarPorCliente, buscarPorId, inserir,
// atualizar, remover). Só o "como" mudou: o array virou tabela.
export const agendamentoModel = {
  listar() {
    return db.prepare("SELECT * FROM agendamento ORDER BY id").all();
  },

  listarPorCliente(clienteId) {
    return db
      .prepare("SELECT * FROM agendamento WHERE clienteId = ? ORDER BY id")
      .all(clienteId);
  },

  buscarPorId(id) {
    return db.prepare("SELECT * FROM agendamento WHERE id = ?").get(id) ?? null;
  },

  inserir({ horario, clienteId }) {
    const r = db
      .prepare(
        "INSERT INTO agendamento (horario, clienteId, status, justificativaFalta, criadoEm) VALUES (?, ?, 'agendado', NULL, ?)",
      )
      .run(
        new Date(horario).toISOString(),
        Number(clienteId),
        new Date().toISOString(),
      );
    return this.buscarPorId(r.lastInsertRowid);
  },

  atualizar(id, dados) {
    const atual = this.buscarPorId(id);
    if (!atual) return null;
    const novo = { ...atual, ...dados };
    db.prepare(
      "UPDATE agendamento SET horario = ?, clienteId = ?, status = ?, justificativaFalta = ? WHERE id = ?",
    ).run(
      novo.horario,
      Number(novo.clienteId),
      novo.status,
      novo.justificativaFalta ?? null,
      id, // o id nunca muda
    );
    return this.buscarPorId(id);
  },

  remover(id) {
    const r = db.prepare("DELETE FROM agendamento WHERE id = ?").run(id);
    return r.changes > 0; // true = removeu
  },
};
