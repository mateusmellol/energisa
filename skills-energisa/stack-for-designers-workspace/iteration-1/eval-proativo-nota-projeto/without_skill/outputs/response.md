Três tecnologias, três implicações diretas pro seu fluxo.

**React** — o dev vai construir a interface em componentes. Na prática isso significa que o que você projetar no Figma precisa ter a mesma lógica: cada peça reutilizável (card, botão, formulário) deve ser um componente isolado, não um elemento solto no meio de um frame. Se você já usa Figma Components, tá no caminho certo — a nomenclatura que você usa vai aparecer no diálogo com o dev. Um botão "Button/Primary/Default" no Figma vira um `<Button variant="primary" />` no código. Quanto mais alinhada a nomenclatura, menos atrito no handoff.

**Tailwind** — o dev não vai escrever CSS do zero. Ele usa classes utilitárias com escala de espaçamento e tipografia definidas (4, 8, 12, 16, 24, 32px...). Isso afeta você diretamente: se você usar espaçamentos fora dessa grade no Figma, o dev vai arredondar ou improvisar na hora de implementar. Padronize seus espaçamentos e tamanhos de fonte com múltiplos de 4. Cores também — pergunte pro dev quais são as cores configuradas no `tailwind.config` e use exatamente essas no seu design system no Figma. Qualquer cor fora do config vai virar um workaround.

**Supabase** — banco de dados e autenticação gerenciados. Não afeta o visual diretamente, mas afeta os estados que você precisa projetar. A landing page do NinaSeg provavelmente tem algum formulário de contato ou cadastro. Esses dados vão pro Supabase. Isso significa que você precisa projetar os estados de loading, sucesso e erro do formulário — não só o estado padrão. "Enviando...", "Mensagem enviada", "Erro, tente novamente" — são fluxos reais que o dev vai implementar e que você precisa entregar no Figma.

**Resumo prático:**
- Use Figma Components com nomenclatura clara para tudo que se repete
- Espaçamentos em múltiplos de 4, tipografia e cores alinhadas com o config do Tailwind
- Projete todos os estados de formulário (idle, loading, success, error)
- No handoff, agrupe por componente, não por página — facilita a vida do dev

Se quiser, pede pro dev te mandar o `tailwind.config.js` — você consegue criar as variáveis de cor e tipo direto no Figma com base nisso, e o handoff fica praticamente sem ruído.
