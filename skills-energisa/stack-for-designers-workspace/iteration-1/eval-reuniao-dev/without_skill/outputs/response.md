# Reunião com o dev amanhã — o que você precisa saber

Duas tecnologias, dois papéis diferentes. Deixa eu separar o que importa pro seu contexto.

---

## Next.js — o que é e o que muda pra você

Next.js é um framework em cima do React. Pensa assim: React é uma linguagem pra construir interfaces; Next.js é a estrutura que organiza como essa interface vira um site real — com páginas, rotas, carregamento de dados, SEO.

**O que isso implica pro seu trabalho:**

- **Rotas = páginas.** Cada "caminho" da URL corresponde a um arquivo no projeto. Se você entregou telas separadas no Figma, o dev vai criar uma rota pra cada uma. Isso ajuda a alinhar nomenclatura — se você chamou de "Tela de Contratação", pode ser que ele chame de `/contratacao`.

- **Componentes são reutilizáveis.** Next.js (via React) trabalha com componentes — blocos de UI que se repetem. Botão, card, header: cada um é um componente. Se você fez variações no Figma, o dev vai mapear isso como props (variações de um mesmo componente). Quanto mais consistente for seu design system, mais fácil é pra ele.

- **SSR e SSG** — você pode ouvir esses termos. São formas de renderizar a página (no servidor antes de chegar no usuário, ou gerada de vez em quando). Não precisa entender os detalhes técnicos, mas se o dev falar sobre isso, a pergunta certa é: "isso afeta o que o usuário vê na primeira carga? Preciso pensar em algum estado de loading?"

---

## TypeScript — o que é e o que muda pra você

TypeScript é uma camada em cima do JavaScript que adiciona "tipos" — o código especifica exatamente que tipo de dado vai em cada lugar (texto, número, booleano, etc.). Isso reduz bugs e melhora a manutenção.

**O que isso implica pro seu trabalho:**

- Nenhuma diferença visual direta. Você não vai ver TypeScript no produto final.
- O que muda: quando você entrega especificações de dados (campos de formulário, conteúdo dinâmico, estrutura de cards), o dev vai precisar saber o tipo de cada campo. Texto? Número? Lista de opções fixas? Se você já pensou nisso no Figma, você economiza tempo dele.

---

## O que perguntar amanhã

**Sobre o fluxo de trabalho:**
1. "Como você prefere receber o handoff? Figma com anotações, ou você extrai direto?"
2. "Você usa alguma convenção de nome pra componentes? Quero manter consistência no Figma."
3. "Tem algum design system ou biblioteca de componentes já definida (como shadcn, MUI, Radix)? Ou parte do zero?"

**Sobre o projeto:**
4. "Quais telas têm dados dinâmicos? Preciso saber onde projetar estados de loading e erro."
5. "Tem alguma restrição técnica que eu preciso considerar no layout? (altura fixa, tamanhos de imagem, limites de texto)"
6. "Como vai ser o processo de revisão? Você me chama quando implementar algo pra eu validar?"

**Sobre entrega:**
7. "Qual é o prazo mais crítico do lado de vocês? Quero priorizar o que desbloqueia o desenvolvimento."

---

## O que você não precisa saber

Não precisa entender como o Next.js faz roteamento internamente, como TypeScript compila, nem nada sobre o banco de dados. Seu trabalho é clareza no design — telas bem anotadas, estados mapeados (vazio, erro, loading, sucesso), nomenclatura consistente.

O que o dev precisa de você é previsibilidade. Quanto mais o Figma parece "código que ainda não foi escrito", mais fácil é pra ele.
