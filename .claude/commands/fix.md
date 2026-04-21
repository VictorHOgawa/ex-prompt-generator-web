---
description: Cria uma nova branch de fix (correção de bug) a partir de staging
argument-hint: <nome-em-kebab-case>
---

Crie uma branch de correção de bug seguindo o fluxo em CLAUDE.md.

Passos:

1. Valide `$ARGUMENTS` como kebab-case. Se inválido, pare e peça corretamente. Se fizer sentido, sugira formato `<numero-issue>-<descricao-curta>` (ex: `123-quiz-loop-infinito`).
2. `git status` para confirmar working tree limpo. Se sujo, pare.
3. Verifique que `staging` existe remotamente. Se não, pare e informe.
4. Atualize staging:
   ```
   git fetch origin
   git checkout staging
   git pull origin staging
   ```
5. Crie a branch: `git checkout -b fix/$ARGUMENTS`
6. Confirme com `git status` e informe o próximo passo.

Se o bug é crítico em produção, sugira usar `/hotfix` ao invés de `/fix`.
