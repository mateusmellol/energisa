Essa stack tem implicações diretas pro seu fluxo. Vou passar por cada peça.

---

## React

**O que é**
Um sistema para construir interfaces em blocos reutilizáveis chamados componentes — pense nos seus frames e variants no Figma, mas em código.

**Por que existe**
Sem React, o dev precisaria reescrever o mesmo botão ou card em cada página. Com React, um componente é criado uma vez e reaproveitado em todo lugar.

**O que muda pra você**
- Cada componente no código deve ter um espelho no Figma. Se o dev tem um componente `CardPlano`, você precisa ter um frame/componente com o mesmo nome e mesma estrutura no seu arquivo.
- Nomeie componentes no Figma igual ao código. Conversa com o dev antes de entregar pra saber como ele está chamando as coisas. Um botão chamado "CTA Button" no Figma e "PrimaryButton" no código gera atrito desnecessário.
- Pense em estados. React renderiza a UI com base em dados — o que significa que cada componente pode ter variações: vazio, carregando, com erro, com sucesso. Você precisa desenhar esses estados no Figma, não só o estado "feliz".

**Vocabulário útil**
- Componente: bloco de UI reutilizável (= seu componente do Figma)
- Props: as "variáveis" que você passa pro componente (= suas propriedades de componente no Figma)
- Estado (state): o que o componente "sabe" naquele momento — ex.: botão carregando vs. botão normal
- Renderizar: o React "desenhar" o componente na tela com base nos dados atuais

---

## Tailwind CSS

**O que é**
Um sistema de CSS que usa classes utilitárias com uma escala de valores predefinida — como se o Figma tivesse tokens de espaçamento obrigatórios que o dev já configurou.

**Por que existe**
Em vez de escrever CSS personalizado pra cada elemento, o dev aplica classes como `p-4` (padding de 16px) ou `text-gray-700` direto no HTML. É mais rápido e mais consistente.

**O que muda pra você**
- Use múltiplos de 4px no espaçamento. O Tailwind trabalha numa escala: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px... Se você entregar um padding de 14px, o dev vai ter que adaptar de qualquer jeito. Já entregue valores que estão na escala.
- As cores têm nomes no Tailwind. Se você usar uma paleta personalizada, pergunte pro dev como ela está configurada. Ele pode ter definido algo como `primary-500` ou `brand-blue` — use esses nomes nos seus tokens do Figma pra o handoff ser limpo.
- Defina seus tokens de cor e tipografia no Figma alinhados com o que o dev configurou. Se ele tem `gray-900` como cor de texto principal, crie uma variável com esse nome no Figma.

**Vocabulário útil**
- Classe utilitária: uma instrução CSS pequena aplicada direto no elemento (`mt-4` = margin-top: 16px)
- Escala de espaçamento: a régua de valores válidos do Tailwind (múltiplos de 4px)
- Config do Tailwind: arquivo onde o dev personaliza as cores e fontes do projeto — peça pra ver antes de definir sua paleta
- Breakpoints: pontos de responsividade — `sm`, `md`, `lg`, `xl` (você precisa saber quais o projeto usa pra projetar as telas certas)

---

## Supabase

**O que é**
O banco de dados e sistema de autenticação do projeto — é onde ficam os dados reais (clientes, cotações, formulários) que aparecem na interface.

**Por que existe**
Pra uma landing page de corretora, você provavelmente tem um formulário de contato ou solicitação de cotação. Esses dados precisam ir pra algum lugar. O Supabase é esse lugar, mais autenticação se houver área logada.

**O que muda pra você**
- Qualquer coisa que exibe dados do banco precisa de um estado de loading e um estado de erro. Se tem uma lista de planos vindo do banco, você precisa desenhar: o que aparece enquanto carrega? O que aparece se der erro? O que aparece se vier vazio?
- Formulários são componentes críticos. O Supabase recebe os dados dos formulários — então o design precisa cobrir: validação em tempo real, mensagem de sucesso, mensagem de erro. Desenhe todos esses estados.
- Não é problema seu configurar o banco, mas você precisa saber quais dados existem pra projetar a UI certa. Pergunte pro dev: quais campos o formulário salva? Quais dados o usuário pode ver depois de enviar?

**Vocabulário útil**
- Tabela: onde os dados ficam organizados (como uma planilha)
- Autenticação: sistema de login/cadastro
- API: a "ponte" entre o banco e a interface — o Supabase gera isso automaticamente
- Loading state: estado visual enquanto os dados estão sendo buscados

---

## O que fazer agora no NinaSeg

Antes de entregar o Figma pro dev, três coisas práticas:

1. **Alinhe nomes de componentes.** Peça pro dev listar os componentes que ele já criou ou planeja criar. Renomeie os seus no Figma pra bater.

2. **Defina a paleta de cores com os tokens do Tailwind.** Peça o arquivo de configuração (`tailwind.config.js`) ou pelo menos a lista de cores do projeto. Configure suas variáveis no Figma com esses nomes.

3. **Desenhe os estados que faltam.** Para cada componente que exibe dados ou tem interação: vazio, carregando, erro, sucesso. O dev vai precisar disso — e você evita ir e vir depois.

---

**Referências úteis:**
- [React — Thinking in React](https://react.dev/learn/thinking-in-react): como devs pensam em componentes. Vale 10 minutos.
- [Tailwind — Core Concepts](https://tailwindcss.com/docs/utility-first): entende a lógica de escala.
- [Fireship — React in 100 Seconds](https://www.youtube.com/watch?v=Tn6-PIqc4UM): overview rápido.
- [NNG — Developer Handoff](https://www.nngroup.com/articles/developer-handoff/): como fazer um handoff que o dev consegue usar de verdade.
