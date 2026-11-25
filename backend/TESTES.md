Teste no Thunder Client, na ordem: criar (201), listar (200), buscar um (200), buscar inexistente (404), violar a sua regra (400/409/422), atualizar (200), remover (204). Registre em `backend/TESTES.md`:

```markdown
# Testes da API — Projeto 1 (S3)

API: Barbearia · entidades: Cliente e Agendamento · servidor: `npm run dev` em http://localhost:3000

> Os dados ficam em memória: reinicie o servidor antes de começar para os ids partirem de 1.

| #   | Método | URL                       | Body                                                                               | Status obtido | Observação                                 |
| --- | ------ | ------------------------- | ---------------------------------------------------------------------------------- | ------------- | ------------------------------------------ |
| 1   | POST   | /clientes                 | {"nome":"João Silva","email":"joao@email.com","telefone":"83999990000","idade":30} | 201           |                                            |
| 2   | POST   | /agendamentos             | {"horario":"2026-12-01T14:30:00","clienteId":1}                                    | 201           | nasce com status "agendado"                |
| 3   | GET    | /clientes                 | —                                                                                  | 200           |                                            |
| 4   | GET    | /agendamentos?clienteId=1 | —                                                                                  | 200           | filtro 1:N                                 |
| 5   | GET    | /clientes/1               | —                                                                                  | 200           |                                            |
| 6   | GET    | /clientes/99              | —                                                                                  | 404           |                                            |
| 7   | GET    | /agendamentos/99          | —                                                                                  | 404           |                                            |
| 8   | POST   | /clientes                 | {"nome":"Maria"}                                                                   | 400           | regra: nome, email e telefone obrigatórios |
| 9   | POST   | /clientes                 | {"nome":"Outro João","email":"joao@email.com","telefone":"83988880000"}            | 409           | regra: email único                         |
| 10  | POST   | /agendamentos             | {"horario":"abc","clienteId":1}                                                    | 400           | regra: horário deve ser data/hora válida   |
| 11  | POST   | /agendamentos             | {"horario":"2026-12-02T10:00:00","clienteId":999}                                  | 422           | cliente não existe                         |
| 12  | PUT    | /clientes/1               | {"telefone":"83977770000"}                                                         | 200           |                                            |
| 13  | PUT    | /agendamentos/1           | {"status":"cancelado"}                                                             | 200           |                                            |
| 14  | DELETE | /agendamentos/1           | —                                                                                  | 204           |                                            |
| 15  | DELETE | /clientes/1               | —                                                                                  | 204           |                                            |
```
