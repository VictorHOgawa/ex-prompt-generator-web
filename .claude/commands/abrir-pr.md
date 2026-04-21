---
description: Abre um Pull Request da branch atual seguindo o template e apontando para o destino correto
---

Abra um Pull Request para a branch atual. Invoque também a skill `pr-template` para garantir o padrão de descrição.

Passos:

1. Confirme a branch atual com `git branch --show-current`.
2. Determine o destino com base no prefixo:
   - `feat/*`, `fix/*`, `chore/*` → PR para `staging`
   - `hotfix/*` → PR para `main`
   - `staging` → PR para `main` (use `/promover-staging` nesse caso)
   - Qualquer outro prefixo → pare e avise que o nome não segue a convenção.
3. Garanta que a branch está pushed e atualizada:
   ```
   git push -u origin HEAD
   ```
4. Verifique `gh auth status`. Se falhar, pare e peça para o usuário rodar `gh auth login`.
5. Analise os commits e diff da branch:
   ```
   git log <destino>..HEAD --oneline
   git diff <destino>...HEAD --stat
   ```
6. Elabore título (Conventional Commits, < 70 chars) e descrição seguindo o template.
7. Abra o PR via gh CLI:
   ```
   gh pr create --base <destino> --title "<titulo>" --body "<descricao>"
   ```
8. Retorne a URL do PR para o usuário.
