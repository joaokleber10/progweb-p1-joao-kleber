```markdown
# Telas do Projeto 1 (S4)

Front: `npx http-server -p 5500 -c-1` em `frontend/` · API: `npm run dev` em `backend/`

| Lista      | Estado        | Como provocar                | O que aparece                                    |
| ---------- | ------------- | ---------------------------- | ------------------------------------------------ |
| Categorias | carregando    | Network → throttling 3G → F5 | spinner "Carregando categorias…"                 |
| Categorias | vazio         | API recém-iniciada           | "Nenhuma categoria ainda…"                       |
| Categorias | erro          | Ctrl+C na API → F5           | "Não consegui falar com a API…" + Tentar de novo |
| Categorias | sucesso       | cadastrar "Bebidas"          | tabela com 1 linha                               |
| Produtos   | vazio         | sem produtos                 | "Nenhum produto ainda…"                          |
| Produtos   | erro de regra | preço -1                     | aviso "Preço deve ser maior que zero" (400)      |

## Camadas

- api: `js/api.js` · services: `js/services/` · state: `js/state/store.js` · ui: `js/ui/`
```

Mínimo: os **quatro estados de uma lista** e **um erro de regra** vindo do backend (400, 409 ou 422).

## Passo B6 — Commit, push e pull request

```bash
cd ..               # raiz do repositório
git add backend/package.json backend/package-lock.json backend/src/app.js frontend/
git commit -m "feat(frontend): SPA do Projeto 1 em camadas (categorias e produtos)"
git push
```
