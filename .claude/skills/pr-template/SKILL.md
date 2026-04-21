---
name: pr-template
description: Template oficial de descrição de Pull Request e checklist de revisão. Invoque sempre que for abrir um PR no app_executivos_prod1, ou quando for revisar um PR e precisar do checklist de critérios.
---

# Template e Checklist de Pull Request

Todo PR do projeto deve seguir esta estrutura. O arquivo `.github/pull_request_template.md` já pré-popula o formulário, mas é responsabilidade do autor (ou do Claude ao abrir em nome dele) preencher com substância.

## Estrutura da descrição

```markdown
## Contexto

<1-3 frases explicando o porquê da mudança. O que motivou? Que problema resolve? Se existe issue vinculada, referencie: "Resolve #123".>

## Mudanças

<Lista objetiva do que foi alterado. Foque no que o revisor precisa saber, não em tudo que você fez.>

- <Mudança 1>
- <Mudança 2>

## Como testar

<Passos explícitos para o revisor validar. Inclua prints/GIFs se for mudança visual.>

1. <Passo 1>
2. <Passo 2>
3. <Resultado esperado>

## Tipo de mudança

- [ ] feat (nova funcionalidade)
- [ ] fix (correção)
- [ ] chore (manutenção/config)
- [ ] hotfix (emergência em prod)
- [ ] docs
- [ ] refactor
- [ ] style
- [ ] perf
- [ ] test
- [ ] ci/build

## Checklist

- [ ] `yarn lint` passa sem warnings
- [ ] `yarn build` conclui sem erros
- [ ] Não há `console.log`, `debugger` ou código comentado esquecido
- [ ] Nenhum secret, token, ou credencial foi commitado
- [ ] Variáveis de ambiente novas foram adicionadas a `.env.example` (sem valores reais)
- [ ] Commits seguem Conventional Commits
- [ ] Branch foi criada a partir da origem correta (staging ou main)
- [ ] PR está apontando para o destino correto (staging ou main)

## Screenshots (se aplicável)

<Anexar se for mudança visual>
```

## Regras para título do PR

- Segue Conventional Commits: `<tipo>: <descrição curta em minúsculas>`
- Máximo 70 caracteres
- Sem ponto final
- Exemplos: `feat: adicionar login com google`, `fix: corrigir loop do quiz`

## Critérios de revisão (para o pr-reviewer agent)

Quando revisar um PR, avalie:

1. **Escopo**: o PR faz uma coisa só? Se mistura várias mudanças não relacionadas, sugira split.
2. **Commits**: seguem Conventional Commits? Estão atômicos?
3. **Branch**: nome segue convenção? Destino do PR está correto?
4. **Código**:
   - Há `console.log`, `debugger` esquecidos?
   - Há código morto/comentado?
   - Há secrets, tokens, URLs hardcoded que deveriam estar em env vars?
   - Componentes React novos seguem padrões do projeto (hooks, TypeScript strict, etc.)?
   - Chamadas ao Supabase tratam erros?
5. **Testes**: se há lógica não-trivial, há testes? (O projeto ainda não tem runner configurado — neste caso, só alerte.)
6. **TypeScript**: tem `any` que poderia ser tipado? Tem `@ts-ignore` sem justificativa?
7. **Tailwind**: classes novas seguem padrão do projeto? Tem duplicação evidente?
8. **Performance**: há re-renders evidentes, useEffects sem dependências corretas, listas sem key?
9. **Acessibilidade**: elementos interativos têm `aria-*` quando relevante? Imagens têm `alt`?
10. **Descrição do PR**: contexto claro? Instruções de teste executáveis?

Formato do retorno da revisão:

```markdown
## Revisão

**Veredito**: <approve / request-changes / comment>

### Pontos positivos
<O que está bom>

### Pontos a corrigir (bloqueantes)
<O que precisa ser resolvido antes de mergear>

### Sugestões (não bloqueantes)
<Melhorias opcionais>
```
