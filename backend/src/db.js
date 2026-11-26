import Database from "better-sqlite3";
import path from "node:path";
import { fileURLToPath } from "node:url";

// O arquivo do banco fica em backend/barbearia.db, não importa de onde o servidor é iniciado.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database(path.join(__dirname, "..", "barbearia.db"));

// O SQLite só respeita REFERENCES se isto for ligado em CADA conexão.
db.exec("PRAGMA foreign_keys = ON");

// A tabela "pai" (cliente) vem primeiro: agendamento referencia cliente(id).
db.exec(`
  CREATE TABLE IF NOT EXISTS cliente (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    nome     TEXT NOT NULL,
    email    TEXT NOT NULL UNIQUE,
    telefone TEXT NOT NULL,
    idade    INTEGER
  );

  CREATE TABLE IF NOT EXISTS agendamento (
    id                 INTEGER PRIMARY KEY AUTOINCREMENT,
    horario            TEXT NOT NULL,
    clienteId          INTEGER NOT NULL REFERENCES cliente(id),
    status             TEXT NOT NULL DEFAULT 'agendado'
                       CHECK (status IN ('agendado', 'confirmado', 'cancelado', 'faltou')),
    justificativaFalta TEXT,
    criadoEm           TEXT NOT NULL
  );
`);

export { db };
export default db;
