---
description: Abre o PR de promoção staging → main (release para produção)
---

Invoque a skill `staging-promotion` para o procedimento completo.

Resumo dos passos (a skill detalha cada um):

1. Confirme que está na branch `staging` e que ela está atualizada.
2. Liste os commits que irão para produção: `git log main..staging --oneline`.
3. Verifique se há PRs abertos apontando para staging que ainda não foram mergeados — se sim, avise e pare.
4. Monte as release notes agrupando por tipo (feat/fix/chore/etc).
5. Abra o PR:
   ```
   gh pr create --base main --head staging --title "release: <data-ou-versao>" --body "<release-notes>"
   ```
6. Retorne a URL para o usuário.

Este PR precisa de 1 approval e CI verde antes de ser mergeado.
