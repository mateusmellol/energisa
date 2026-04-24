# Reunião com o dev: Next.js + TypeScript

Boa notícia: nenhuma dessas tecnologias muda o que você faz no Figma. Mas entender o que elas implicam vai mudar a qualidade da conversa que você tem amanhã.

---

## Next.js

**O que é:** React com roteamento e performance embutidos. Pensa como um React turbinado que já resolve várias coisas de infraestrutura sem precisar configurar do zero.

**Por que existe:** React sozinho só renderiza componentes — não sabe nada de navegação entre páginas, SEO ou carregamento otimizado. Next.js resolve esses problemas de forma padrão.

**O que muda pra você:**
- Transições entre páginas são gerenciadas pelo framework. Se você projetou animações de transição, pergunte se Next.js suporta o que você pensou.
- Loading states são problema de UX, não só de código. Next.js tem comportamentos de carregamento por rota — você precisa ter desenhado o que aparece enquanto dados carregam.
- SEO está no seu radar agora. Ordem de headings (H1, H2...) e texto alt de imagens são responsabilidade do design/conteúdo também.

**Vocabulário útil:** SSR (renderizado no servidor), SSG (gerado em build time), route (caminho de URL = uma tela), component, props.

---

## TypeScript

**O que é:** JavaScript com regras mais rígidas. O dev define exatamente que tipo de dado cada coisa aceita.

**O que muda pra você:** Quase nada visualmente. Mas o dev vai querer que seus componentes tenham estados bem definidos. TypeScript força precisão — se você entregar um componente sem o estado `empty`, `loading` ou `error` desenhado, ele vai precisar inventar do zero.

---

## O que perguntar amanhã

1. "Você já tem algum design system ou biblioteca de componentes configurada?" — Se ele usa shadcn/ui ou Radix, parte já existe em código.
2. "Qual o sistema de espaçamento que você usa?" — Se usar Tailwind, é múltiplos de 4px e seus tokens precisam conversar com isso.
3. "Quais são os estados que você precisa que eu desenhe pra cada componente?" — Abre a conversa sobre empty, loading, error e success.
4. "Como você prefere receber o handoff?" — Dev Mode no Figma, spec manual, etc.
5. "Tem alguma limitação técnica que eu preciso saber antes de propor soluções?" — Pergunta aberta que revela restrições que você não saberia perguntar diretamente.

---

## Para ir mais fundo (grátis)

- Next.js em 100 segundos: https://www.youtube.com/watch?v=Sklc_fQBmcs
- TypeScript em 100 segundos: https://www.youtube.com/watch?v=zQnBQ4tB3ZA
- NNG — Designer-Developer Handoff: https://www.nngroup.com/articles/developer-handoff/
- NNG — Design Tokens: https://www.nngroup.com/articles/design-tokens/
