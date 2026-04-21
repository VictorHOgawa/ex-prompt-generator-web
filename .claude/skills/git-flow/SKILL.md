---
name: git-flow
description: Procedimento oficial de fluxo Git do projeto — criação de branches (feat/fix/chore/hotfix), commits em Conventional Commits, abertura de PRs, promoção de staging para main, e limpeza. Invoque sempre que o usuário mencionar criar branch, commitar, abrir PR, fazer release, ou operar qualquer mudança no histórico Git.
---

# Fluxo Git do app_executivos_prod1

Este procedimento traduz as regras definidas no `CLAUDE.md` em passos executáveis. Siga-o com rigor — branches mal nomeadas ou commits fora do padrão comprometem a automação (CI, branch protection, release notes).

## Tipos de trabalho e origem da branch

| Trabalho              | Prefixo     | Origem    | Destino do PR |
| --------------------- | ----------- | --------- | ------------- |
| Nova funcionalidade   | `feat/`     | `staging` | `staging`     |
| Correção de bug       | `fix/`      | `staging` | `staging`     |
| Manutenção/deps       | `chore/`    | `staging` | `staging`     |
| Emergência em prod    | `hotfix/`   | `main`    | `main`        |
| Release para produção | `staging`   | —         | `main`        |

## Passo a passo: iniciar um trabalho

1. **Identificar o tipo** com o usuário. Se ambíguo, pergunte. Critérios:
   - Usuário final vai ver algo novo? → `feat`
   - Está corrigindo comportamento quebrado não crítico? → `fix`
   - É dependência, config, CI, refactor interno? → `chore`
   - Está quebrado EM PRODUÇÃO e precisa ir agora? → `hotfix` (invoque também a skill `hotfix-emergencial`)

2. **Verificar working tree limpo**: `git status`. Se houver mudanças, pergunte ao usuário se quer stashar ou commitar antes.

3. **Atualizar a branch de origem**:
   - Para feat/fix/chore: `git fetch origin && git checkout staging && git pull origin staging`
   - Para hotfix: `git fetch origin && git checkout main && git pull origin main`

4. **Criar a branch** com nome kebab-case descritivo:
   ```
   git checkout -b <tipo>/<descricao-curta>
   ```
   Exemplos bons: `feat/checkout-pix`, `fix/landing-page-redirect`, `chore/atualizar-react-router`.

5. **Confirmar ao usuário** antes de começar: nome da branch, commit de origem, próximo passo.

## Passo a passo: commitar mudanças

1. Verifique o que vai entrar no commit: `git status` e `git diff --staged`.
2. Nunca use `git add -A` ou `git add .` sem analisar — arquivos sensíveis (`.env.local`) podem escapar.
3. Escreva a mensagem em **Conventional Commits**:
   ```
   <tipo>(<escopo opcional>): <descrição em minúsculas e presente>
   ```
   Tipos: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`.
4. Mostre a mensagem ao usuário e peça aprovação antes de commitar (a menos que ele já tenha autorizado em massa).
5. Para commits de múltiplas mudanças, prefira separar em commits atômicos.

## Passo a passo: abrir PR

1. Faça push da branch: `git push -u origin HEAD`.
2. Valide `gh auth status`. Se falhar, pare e peça `gh auth login`.
3. Determine o destino:
   - `feat/*`, `fix/*`, `chore/*` → `staging`
   - `hotfix/*` → `main`
4. Colete contexto:
   ```
   git log <destino>..HEAD --oneline
   git diff <destino>...HEAD --stat
   ```
5. Invoque a skill `pr-template` para o formato correto.
6. Abra:
   ```
   gh pr create --base <destino> --title "<tipo>: <descrição curta>" --body "<template preenchido>"
   ```
7. Retorne a URL do PR.

## Passo a passo: depois do merge

- Se auto-delete está ativo, a branch remota é apagada sozinha.
- Apague a local: `git branch -d <branch>` (ou `-D` se necessário, mas confirme primeiro).
- Volte para staging: `git checkout staging && git pull origin staging`.

## Regras que nunca se quebram

- `main` nunca recebe push direto. Sempre PR.
- `staging` nunca recebe push direto. Sempre PR.
- Nunca commite `.env.local`, `.env`, chaves, tokens.
- Nunca use `--no-verify` ou `--no-gpg-sign` sem o usuário pedir explicitamente.
- Se um hook pre-commit falhar, **fix the issue e crie um NOVO commit**. Nunca use `--amend` para contornar hook falhando.
- Se surgir dúvida sobre qual tipo usar, pergunte em vez de chutar.
