---
description: Cria uma nova branch de chore (manutenção, deps, config) a partir de staging
argument-hint: <nome-em-kebab-case>
---

Crie uma branch de chore seguindo o fluxo em CLAUDE.md.

Use `chore/` para: atualização de dependências, mudanças de configuração, tweaks de infraestrutura, tarefas administrativas que não afetam comportamento visível ao usuário.

Passos:

1. Valide `$ARGUMENTS` como kebab-case. Se inválido, pare e peça corretamente.
2. `git status` para confirmar working tree limpo. Se sujo, pare.
3. Atualize staging:
   ```
   git fetch origin
   git checkout staging
   git pull origin staging
   ```
4. Crie a branch: `git checkout -b chore/$ARGUMENTS`
5. Confirme e informe o próximo passo.
