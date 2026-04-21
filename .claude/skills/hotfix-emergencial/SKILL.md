---
name: hotfix-emergencial
description: Procedimento de hotfix emergencial para bugs críticos em produção. Invoque sempre que o usuário mencionar hotfix, "está quebrado em prod", "preciso corrigir urgente", ou usar o comando /hotfix.
---

# Hotfix Emergencial

Hotfix é para um cenário específico: **algo está quebrado em produção AGORA e o fluxo normal staging → main é lento demais**. Use com parcimônia.

## Quando NÃO é hotfix

- Bug incômodo mas não crítico → é `fix/`, vai pelo fluxo normal
- Feature urgente que o cliente pediu → é `feat/`, vai pelo fluxo normal
- Qualquer coisa que possa esperar 1-2 dias no ciclo de staging → fluxo normal

## Quando É hotfix

- Produção caiu
- Dados sendo corrompidos
- Segurança comprometida (vazamento, bypass de auth, etc.)
- Usuários sendo impedidos de completar jornada crítica (checkout, login)

## Procedimento

### 1. Confirmar com o usuário

Antes de criar a branch, confirme que este cenário realmente justifica hotfix. Se há dúvida, vá pelo fluxo normal.

### 2. Partir de main

```
git fetch origin
git checkout main
git pull origin main
git checkout -b hotfix/<descricao-curta-do-problema>
```

Exemplos bons: `hotfix/landing-page-404`, `hotfix/checkout-crash-mobile`.

### 3. Corrigir o problema

- Faça a correção **mínima**. Hotfix não é hora de refatorar ou limpar código ao redor.
- Não misture correções não relacionadas.
- Commite em Conventional Commits: `fix: <o que foi corrigido>` ou `hotfix: <o que foi corrigido>` (pode usar ambos; prefira `fix:` com prefixo de branch já deixando claro).

### 4. Validar localmente

```
yarn lint
yarn build
```

Se possível, teste o cenário quebrado especificamente.

### 5. Abrir PR para main

```
git push -u origin HEAD
gh pr create --base main --title "hotfix: <descrição>" --body "<descrição do incidente + fix>"
```

O body deve conter:

```markdown
## 🚨 Hotfix

**Incidente**: <o que estava quebrado>
**Impacto**: <quem foi afetado e desde quando>
**Causa raiz**: <por que aconteceu>
**Correção**: <o que esta mudança faz>
**Plano de teste**: <como validar em staging/prod após merge>
**Risco de rollback**: <alto/médio/baixo + como reverter se necessário>

## Checklist pós-merge

- [ ] Criar PR de sync para replicar o fix em staging
- [ ] Monitorar logs/métricas por pelo menos 1h após deploy
- [ ] Postmortem se o incidente durou mais de 30min
```

### 6. Merge e deploy

- Exige 1 approval + CI verde (igual qualquer PR para main).
- Se não há ninguém disponível para aprovar num cenário realmente crítico, decida com o usuário. **Não contorne a regra sem confirmação explícita**.

### 7. Sync com staging (OBRIGATÓRIO)

Depois que o hotfix é mergeado em main, staging ficará desatualizada. Faça:

```
git checkout staging
git pull origin staging
git cherry-pick <sha-do-commit-do-hotfix-em-main>
# OU, se preferir, merge de main em staging via PR
git push origin staging
```

Alternativa mais segura: abra um PR `chore: sync main → staging após hotfix` para que o CI rode e o processo fique registrado.

**Nunca deixe staging atrás de main em termos de fixes** — isso quebra o fluxo normal.

### 8. Postmortem (se aplicável)

Se o incidente foi sério (>30min de downtime, afetou pagamento, vazamento, etc.), sugira ao usuário agendar um postmortem e documentar:

- Timeline (detecção, diagnóstico, mitigação, resolução)
- Causa raiz
- Ações de prevenção

## Regras invioláveis

- Hotfix **não** pula CI.
- Hotfix **não** pula approval (a menos que explicitamente autorizado em incidente P0 pelo usuário).
- Toda correção em main **precisa** ser replicada em staging.
- Se houver mais de 1 hotfix no mesmo dia, considere se há problema sistêmico de qualidade no fluxo normal.
