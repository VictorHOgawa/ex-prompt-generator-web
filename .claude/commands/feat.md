---
description: Cria uma nova branch de feature a partir de staging
argument-hint: <nome-em-kebab-case>
---

Crie uma nova branch de feature seguindo o fluxo definido em CLAUDE.md.

Passos:

1. Valide o nome recebido: `$ARGUMENTS` deve ser kebab-case (só letras minúsculas, números e hifens). Se vier vazio ou inválido, pare e peça o nome correto.
2. Verifique que o working tree está limpo com `git status`. Se houver mudanças não commitadas, avise o usuário e pare.
3. Garanta que `staging` existe remotamente: `git ls-remote --heads origin staging`. Se não existir, avise que o setup inicial ainda não foi feito e pare.
4. Atualize staging:
   ```
   git fetch origin
   git checkout staging
   git pull origin staging
   ```
5. Crie a branch: `git checkout -b feat/$ARGUMENTS`
6. Confirme com `git status` e informe ao usuário:
   - Nome da branch criada
   - Commit de origem
   - Próximo passo sugerido (começar a implementar)

Não faça push ainda — só no primeiro commit.
