---
description: Identifica e deleta branches locais e remotas já mergeadas
---

Delegue este trabalho ao agent `branch-cleaner` (contexto isolado).

Se preferir rodar inline, aqui estão os passos:

1. Atualize refs: `git fetch --all --prune`.
2. Liste branches locais mergeadas em main ou staging (exceto main/staging):
   ```
   git branch --merged main | grep -vE '^\*|main|staging'
   git branch --merged staging | grep -vE '^\*|main|staging'
   ```
3. Liste branches remotas cujos PRs estão fechados/mergeados via `gh pr list --state merged --limit 50 --json headRefName`.
4. Mostre ao usuário a lista candidata a deletar, **separadamente locais e remotas**.
5. Peça confirmação explícita antes de deletar.
6. Após aprovação:
   - Locais: `git branch -d <branch>`
   - Remotas: `git push origin --delete <branch>` (pode pular se auto-delete já fez)
7. Relate quantas foram removidas.

Nunca delete `main`, `staging`, ou branches não mergeadas sem confirmação redobrada.
