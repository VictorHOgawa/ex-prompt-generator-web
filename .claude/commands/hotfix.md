---
description: Cria uma branch de hotfix EMERGENCIAL a partir de main
argument-hint: <nome-em-kebab-case>
---

⚠️ **ATENÇÃO**: hotfix é para emergências em produção. Use o fluxo normal `/feat` ou `/fix` para correções não urgentes.

Invoque também a skill `hotfix-emergencial` para seguir o procedimento completo.

Passos:

1. Valide `$ARGUMENTS` como kebab-case. Se inválido, pare.
2. `git status` para confirmar working tree limpo.
3. Atualize main:
   ```
   git fetch origin
   git checkout main
   git pull origin main
   ```
4. Crie a branch: `git checkout -b hotfix/$ARGUMENTS`
5. Alerte o usuário:
   - Após o merge do PR em `main`, será necessário **replicar a correção em `staging`** (via cherry-pick ou novo PR de sync).
   - O PR irá direto para `main` (não passa por staging).
   - Precisa de CI verde e 1 approval.
6. Confirme e comece a trabalhar.
