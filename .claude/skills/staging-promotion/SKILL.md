---
name: staging-promotion
description: Procedimento de promoção de staging para main (release para produção). Invoque sempre que o usuário pedir para "subir pra produção", "fazer release", "promover staging", "mergear staging em main", ou abrir PR de staging para main.
---

# Promoção staging → main (Release)

Esta é a operação mais crítica do fluxo. Execute com atenção.

## Pré-checagens (faça ANTES de abrir o PR)

1. **Branch correta**: você está em `staging` atualizada.
   ```
   git checkout staging
   git pull origin staging
   ```

2. **CI de staging verde**: confirme que o último push em staging passou no CI. Via gh:
   ```
   gh run list --branch staging --limit 1
   ```
   Se falhou, pare e avise.

3. **Sem PRs abertos apontando para staging não mergeados**: se houver PRs que o usuário esperava incluir mas ainda estão abertos, alerte.
   ```
   gh pr list --base staging --state open
   ```

4. **Diff staging vs main não está vazio**:
   ```
   git log main..staging --oneline
   ```
   Se estiver vazio, não há nada a promover — avise.

## Montando as release notes

Liste os commits desde o último merge em main:

```
git log main..staging --pretty=format:"%h %s"
```

Agrupe por tipo (Conventional Commits) nesta ordem:

1. ✨ **Features** (`feat:`)
2. 🐛 **Fixes** (`fix:` e `hotfix:` se aplicável)
3. ⚡ **Performance** (`perf:`)
4. ♻️ **Refactors** (`refactor:`)
5. 📝 **Docs** (`docs:`)
6. 🔧 **Chores** (`chore:`, `build:`, `ci:`)

Para cada item, limpe a mensagem (remova o prefixo do tipo, capitalize a primeira letra). Exemplo:

Input: `feat(auth): adicionar login com google`
Output: `- Adicionar login com Google (auth)`

## Determinando a versão

Use data ISO (`YYYY-MM-DD`) no título por padrão. Se o projeto adota SemVer, sugira bump:

- Só `fix`/`chore` → patch (0.0.X)
- Algum `feat` → minor (0.X.0)
- Breaking change (indicado no commit com `!`) → major (X.0.0)

## Abrindo o PR

```
gh pr create \
  --base main \
  --head staging \
  --title "release: YYYY-MM-DD" \
  --body "<release-notes>"
```

Body sugerido:

```markdown
## Release — YYYY-MM-DD

<Total de X commits desde a última release>

### ✨ Features
- <item>

### 🐛 Fixes
- <item>

### 🔧 Chores
- <item>

## Como testar em staging antes de mergear

<URL do ambiente de staging, se houver>

Checklist:
- [ ] CI verde em staging
- [ ] Fluxos críticos (login, checkout, X, Y) validados manualmente em staging
- [ ] Banco semi-real não apresentou inconsistências
- [ ] Nenhuma regressão reportada desde a última release
```

## Após o merge

1. Confirme o merge em main:
   ```
   git checkout main
   git pull origin main
   git log -1
   ```

2. Se o projeto usa tags de versão, crie a tag:
   ```
   git tag -a v<versao> -m "Release <versao>"
   git push origin v<versao>
   ```

3. Se há hotfixes que foram feitos direto em main durante a janela, garanta que staging foi sincronizada (deve ter acontecido via PR de sync após cada hotfix).

4. Avise o usuário que a release está em produção e sugira monitorar logs/erros nas próximas horas.

## Regra inviolável

Nunca faça force-push em main. Nunca mergeie staging → main sem passar pelo PR (mesmo sendo admin).
