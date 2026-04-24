# React

### O que é

React é uma biblioteca JavaScript que permite construir interfaces como um conjunto de componentes reutilizáveis — pense em símbolos no Figma, mas em código.

### Por que existe

Antes do React, cada mudança na tela de um site exigia recarregar ou reescrever o HTML inteiro. O React resolveu isso: ele atualiza só o pedaço da interface que mudou, sem recarregar tudo. Ficou tão popular que hoje é a base de boa parte dos produtos digitais que você usa.

### O que muda pra você como designer

Essa é a parte que importa.

**Componente no código = componente no Figma.** Quando o dev fala em "componente", ele tá falando da mesma coisa que você faz quando cria um botão no Figma com suas variantes. Um `<Button>` no código deve ter um espelho direto no seu arquivo. Se você desenhar um botão com 4 estados (default, hover, disabled, loading), o dev vai precisar desses 4 estados também.

**Você precisa pensar em estados.** React trabalha com o conceito de "estado" — o que a interface mostra dependendo de uma condição. Isso significa que todo componente que você desenhar pode ter múltiplas versões: vazio, carregando, com erro, com sucesso. Se você entregar só o estado ideal, o dev vai ter que inventar os outros. Não deixa isso acontecer.

**Nomenclatura de componentes importa no handoff.** Quando você nomeia seus frames e componentes no Figma, usar o mesmo nome que o dev usa no código elimina ruído. Antes de criar do zero, pergunta pro dev se já existe um componente para o que você tá desenhando — especialmente se eles usam uma biblioteca como shadcn ou Material UI.

**Transições e animações têm custo.** Animações no React podem ser simples ou complexas dependendo do que você pede. Se você desenhar uma transição elaborada, vale avisar que isso vai precisar de uma biblioteca extra (como Framer Motion). Não é proibido, mas é uma decisão.

### Vocabulário útil

- **Component** — bloco de interface reutilizável. Exato equivalente do seu componente no Figma.
- **Props** — as propriedades que você passa pro componente (cor, texto, tamanho). No Figma são as propriedades do componente.
- **State** — o estado atual de um componente (carregando? com erro? vazio?). Você precisa desenhar cada estado relevante.
- **Re-render** — quando React atualiza a interface por causa de uma mudança. Não afeta seu design diretamente, mas explica por que devs perguntam "quais dados mudam aqui?".
- **JSX** — a sintaxe que o dev usa pra escrever HTML dentro do JavaScript. Você vai ver isso no código do handoff e parece com HTML normal.

### Onde aprender mais (grátis)

- **Fireship — React in 100 Seconds** (overview rápido, vale muito): https://www.youtube.com/watch?v=Tn6-PIqc4UM
- **React Docs — Thinking in React** (como devs pensam em componentes — leitura direta pro designer): https://react.dev/learn/thinking-in-react
- **NNG** — busca por "component-driven design" no nngroup.com pra entender a ponte entre componentes de design e componentes de código.
