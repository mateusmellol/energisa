# Energisa — Plano de Adaptação Mobile
**Dispositivo de referência:** Samsung Galaxy S24 FE  
**Viewport CSS:** 412 × 892 px (device pixel ratio ≈ 2.625×)  
**Breakpoint primário:** `sm` do Tailwind = 640px → usaremos `max-w-[412px]` como referência real. Na prática, o breakpoint `md` (768px) é o corte desktop/mobile.

---

## Contexto do Projeto

Site redesign da Energisa. Stack: Next.js + Tailwind + Framer Motion.  
O `page-container` usa `padding-inline: 120px` — em 412px isso deixaria apenas 172px de conteúdo. **Problema crítico em todas as seções.**

### Seções identificadas (ordem de renderização)
1. Header (nav + logo + CTA)
2. Hero (stock + profiles + headline + CTAs)
3. Services (toggle + 4 cards)
4. Timeline × 3 (tabs + texto + globe + badges)
5. Ecosystem (accordion FlexLab + stats)
6. NewsGrid (4 cards artigos)

---

## Princípios de Mobile para este Projeto

- **Touch targets mínimos:** 44px de altura para todos os botões/links interativos
- **Tipografia:** Títulos grandes (52px+ no desktop) → rebaixar para `clamp` ou valores fixos menores em mobile
- **Grid:** Substituir `grid-cols-12` com `col-span-*` por `flex flex-col` no mobile via `sm:` breakpoints
- **page-container:** Adicionar padding responsivo — `px-5` no mobile, `px-10` em tablet, `px-[120px]` no desktop
- **Scroll horizontal:** Onde fizer sentido (NewsGrid, Services) usar scroll snap no lugar de wrap
- **Accordions/Expansões:** Layouts side-by-side viram stacked verticais no mobile

---

## Sessão 1 — `page-container` (globals.css)
**Arquivo:** `src/styles/theme.css` ← arquivo real (Vite). `src/app/globals.css` é legado/morto.  
**Prioridade:** CRÍTICA — afeta todas as seções  
**Nota:** Os componentes reais (`src/app/components/`) NÃO usam `.page-container`. Cada um tem padding próprio inline. A Sessão 1 deve ser revisada componente por componente.

### Problema atual
```css
.page-container {
  padding-inline: 120px; /* mata o layout em 412px */
}
```
Em 412px: `412 - 240 = 172px` de conteúdo. Inutilizável.

### Ajuste planejado
```css
.page-container {
  width: 100%;
  max-width: var(--grid-max-width);
  margin-inline: auto;
  padding-inline: 20px; /* mobile */
}

@media (min-width: 640px) {
  .page-container { padding-inline: 40px; }
}

@media (min-width: 1024px) {
  .page-container { padding-inline: var(--grid-margin); } /* 120px */
}
```

### Status
- [x] Implementar

---

## Sessão 2 — Header
**Arquivo:** `src/app/components/Header.tsx` ← arquivo real (Vite). `src/components/Header.tsx` é legado/morto.  
**Prioridade:** Alta

### Problema atual
- Nav (`hidden md:flex`) desaparece no mobile — sem hamburger, sem menu alternativo
- CTA button (`hidden md:flex`) desaparece — usuário mobile não tem acesso ao "Começar agora"
- Apenas o logo aparece no mobile
- Altura fixa `h-20` (80px) — ok para mobile, mas sem conteúdo

### Ajuste planejado
1. Adicionar botão hamburger (≡) no lado direito para mobile
2. Menu mobile: drawer ou dropdown full-width com os 3 links de nav
3. Mover CTA para dentro do menu mobile (tamanho completo `w-full`)
4. Considerar: logo centralizado no mobile vs alinhado à esquerda
5. Menu overlay: `fixed inset-0 z-40` com backdrop blur, links em tamanho grande (touch-friendly)

### Estrutura mobile alvo
```
[ Energisa logo ]  [ ≡ hamburger ]
```
↓ ao abrir:
```
┌─────────────────────────────┐
│  Soluções                   │
│  Ecossistema                │
│  Impacto                    │
│                             │
│  [   Começar agora   ]      │
└─────────────────────────────┘
```

### Status
- [x] Implementar hamburger button
- [x] Implementar drawer/menu mobile
- [x] Mover CTA para menu mobile

---

## Sessão 3 — Hero
**Arquivo:** `src/components/Hero.tsx`  
**Prioridade:** Alta

### Problema atual
- Layout usa `grid grid-cols-12` sem breakpoints responsive → overflow horizontal garantido
- Stock ticker `col-span-2` e profile cards `col-start-9 col-span-4` — posicionamento absoluto no grid quebra em mobile
- Headline `text-[52px]` — ocupa mais de 1 linha e empurra tudo
- Body + CTAs em `col-start-8 col-span-5` → fora da tela em 412px
- CTAs `px-8 py-5` com `rounded-full` — ok em tamanho mas layout side-by-side precisa virar stacked ou `w-full`
- `min-h-screen` ok, mas o conteúdo inside vai se perder sem grid responsivo

### Ajuste planejado
**Mobile layout (< 768px):**
```
┌─────────────────────────────┐  ← pt-[header] ~80px
│  [Stock ticker — pequeno]   │
│                             │
│  A Energisa                 │
│  acompanha você             │  ← text-[36px] ou clamp
│                             │
│  De Norte a Sul...          │  ← body text
│                             │
│  [ Explorar ]               │
│  [ Começar agora ]          │  ← stacked, w-full
│                             │
│  [    Globe / imagem    ]   │  ← move para baixo
└─────────────────────────────┘
```

- Profile cards: ocultar no mobile (são decorativos)
- Stock ticker: reposicionar como elemento menor acima do headline ou ocultar
- Globe: full-width abaixo dos CTAs em mobile
- Headline: `text-[36px] md:text-[52px]`
- Botões: `flex-col sm:flex-row` + `w-full sm:w-auto`

### Status
- [ ] Refatorar grid para flex-col no mobile
- [ ] Ajustar tipografia do headline
- [ ] Reposicionar/ocultar stock ticker e profile cards
- [ ] Botões em coluna no mobile

---

## Sessão 4 — Services
**Arquivo:** `src/components/Services.tsx`  
**Prioridade:** Média-Alta

### Problema atual
- `grid grid-cols-12` com cards `col-span-3` → 4 colunas de 25% cada — em 412px: ~85px por card (ilegível)
- Cards têm `h-[180px]` fixo — ok se o layout correto for aplicado
- Toggle + "Mais" link — ok em mobile se largura for adequada

### Ajuste planejado
**Mobile:** 2×2 grid (scroll snap ou grid-cols-2)  
**Tablet:** 4 cards em linha (comportamento atual)

```jsx
// Substituir:
className="grid grid-cols-12 gap-4"
// Por:
className="grid grid-cols-2 md:grid-cols-4 gap-4"
```
Cards: `col-span-1` em todos os breakpoints (remover `col-span-3`).

Altura dos cards em mobile: `h-[140px]` pode funcionar, ou `aspect-[4/3]` para ser fluido.

### Status
- [ ] Refatorar grid de cards para 2 colunas no mobile
- [ ] Ajustar altura dos cards
- [ ] Verificar touch targets do toggle (mínimo 44px)

---

## Sessão 5 — Timeline (×3 instâncias)
**Arquivo:** `src/components/Timeline.tsx`  
**Prioridade:** Média

### Problema atual
- `min-h-[926px]` fixo — muito alto para mobile, cria scroll excessivo
- Globe placeholder: `max-h-[717px] aspect-square` → em 412px seria ~372px de globo, ok mas ocupa a tela toda
- Year + Location badges: `w-[203px] h-[137px]` cada → os dois lado a lado = 406px + gap, quase exatamente a largura do S24 FE (sem padding). **Vai transbordar.**
- Headline `text-[39px]` — grande para mobile
- `page-container` com o problema de padding já mapeado (Sessão 1)

### Ajuste planejado
- **Badge row:** Reduzir para `w-[160px] h-[100px]` em mobile, ou deixar `flex-1` em vez de largura fixa
- **Texto do badge:** `text-[36px] md:text-[49px]`
- **Globe:** `w-full max-h-[300px] md:max-h-[717px]` — contido em mobile
- **Headline:** `text-[28px] md:text-[39px]`
- **Layout geral:** Manter flex-col (já é), apenas ajustar tamanhos e `min-h`

### Status
- [ ] Corrigir badges (largura/tipografia)
- [ ] Conter globo em mobile
- [ ] Ajustar tipografia de título

---

## Sessão 6 — Ecosystem
**Arquivo:** `src/components/Ecosystem.tsx`  
**Prioridade:** Alta

### Problema atual
**Accordion (EcosystemAccordion):**
- Conteúdo expandido: `flex flex-row gap-6` com imagem `flex-[7]` e info `flex-[5]` → layout 2 colunas inviável em 412px
- Texto do trigger: `text-[clamp(2rem,5vw,4rem)]` → em 412px, `5vw = 20.6px` → título ~32px ok, mas junto com index e "Saiba mais" numa linha só vai apertar
- "ECOSSISTEMA / 001" + título centralizado + "Saiba mais" em uma linha — em mobile essa linha vai quebrar feio

**Stats:**
- Headline `text-[52px]` — muito grande para mobile
- Números `text-[80px]` — vão transbordar ou tornar-se minúsculos depois dos ajustes de padding
- Layout `flex items-center` com número à direita: `text-detail (28px) + label` vs número `80px` — ok em desktop mas em mobile a hierarquia fica confusa
- `max-width: ${60 + i * 20}%` → no mobile isso significa stats cada vez mais estreitas, o último fica em 100% mas os primeiros ficam em 60-80% → estranho em tela estreita
- `px-8 md:px-20` direto no componente (não usa page-container) — o `px-8` (32px) é razoável para mobile

### Ajuste planejado
**Accordion mobile:**
- Trigger: empilhar `index` (ocultar ou mover), `título` centralizado, `Saiba mais` abaixo
- Conteúdo expandido: `flex flex-col` no mobile → imagem em cima, info embaixo
- Imagem: `h-48 md:h-64`

**Stats mobile:**
- Headline: `text-[36px] md:text-[52px]`
- Números: `text-[56px] md:text-[80px]`
- Layout: manter `flex items-center` mas o número pode ficar menor ou ir acima do texto
- Remover o `max-width` progressivo no mobile (ou ajustar para 100% em todos)

### Status
- [ ] Accordion: linha de trigger responsiva (index, título, "Saiba mais")
- [ ] Accordion: conteúdo expandido flex-col no mobile
- [ ] Stats: headline e número responsivos
- [ ] Stats: remover/ajustar max-width progressivo no mobile

---

## Sessão 7 — NewsGrid
**Arquivo:** `src/components/NewsGrid.tsx`  
**Prioridade:** Média

### Problema atual
- `flex flex-wrap` com `min-w-[280px] max-w-[340px]` → em 412px (- padding), espaço disponível ~372px
  - Cabe 1 card por linha (280px+), mas o `flex-1` faz ele crescer até preencher a linha → 1 coluna
  - Isso na verdade funciona razoavelmente, mas não é intencional
- Imagem: `h-[400px]` por card → em mobile ocupa toda a tela só com a imagem
- `py-36` (144px) de padding vertical — excessivo para mobile
- Não tem cabeçalho/título de seção visível — só os cards

### Ajuste planejado
- `h-[400px]` → `h-[220px] md:h-[400px]` para as imagens
- `py-36` → `py-16 md:py-36`
- Adicionar título de seção "Notícias" antes dos cards (alinhado com as outras seções)
- Layout: 1 coluna em mobile (`flex flex-col`), 2 colunas em tablet (`grid grid-cols-2`), 4 em desktop
- Ou: scroll horizontal snap em mobile (horizontal scroll de cards tipo carrossel sem controles)

### Decisão a tomar
> Preferência: **scroll vertical 1 coluna** ou **scroll horizontal tipo carrossel**?  
> Recomendo carrossel horizontal (mais compacto, padrão nativo mobile para notícias).

### Status
- [ ] Decidir padrão: scroll vertical vs carrossel horizontal
- [ ] Ajustar altura das imagens
- [ ] Reduzir padding vertical
- [ ] Adicionar título de seção

---

## Sessão 8 — ParallaxHeroServices
**Arquivo:** Verificar `src/components/ParallaxHeroServices.tsx` (ou similar)  
**Prioridade:** Média

> Não lido ainda. Wrapper do Hero + Services com comportamento parallax.  
> Avaliar se o parallax deve ser desabilitado no mobile (`prefers-reduced-motion` ou breakpoint).

### Status
- [ ] Ler o componente
- [ ] Avaliar se parallax deve ser desabilitado em mobile
- [ ] Verificar se adiciona algum overflow ou posicionamento problemático

---

## Ordem de Execução Recomendada

| # | Sessão | Impacto | Complexidade |
|---|--------|---------|--------------|
| 1 | `page-container` (globals.css) | Bloqueador de tudo | Baixa |
| 2 | Header (hamburger menu) | Alta visibilidade | Média |
| 3 | Hero | Primeira impressão | Alta |
| 4 | Services | Usabilidade core | Baixa |
| 5 | Ecosystem accordion | Ilegível atual | Média |
| 6 | Ecosystem stats | Tipografia quebrada | Baixa |
| 7 | Timeline badges | Overflow confirmado | Baixa |
| 8 | NewsGrid | Menos crítico | Baixa |

---

## Checklist Global (Mobile-First)

- [ ] Nenhum elemento excede `100vw`
- [ ] Todos os touch targets ≥ 44px de altura
- [ ] Tipografia não usa px fixos grandes sem `md:` ou `clamp`
- [ ] `page-container` com padding responsivo
- [ ] Sem overflow horizontal em nenhuma seção
- [ ] Header com navegação acessível no mobile
- [ ] Framer Motion animations: verificar se afetam layout em mobile

---

## Notas Técnicas

**Breakpoints Tailwind relevantes:**
- `sm`: 640px (tablet pequeno)  
- `md`: 768px (tablet / corte desktop-mobile aqui)  
- `lg`: 1024px

**Como testar no S24 FE:**
- Chrome DevTools: Device toolbar → Dimensions custom: **412 × 892** @ **2.625x** DPR
- User Agent: Samsung Galaxy S24 FE  
- Ou usar o dispositivo físico via `npm run dev` + IP local na rede
