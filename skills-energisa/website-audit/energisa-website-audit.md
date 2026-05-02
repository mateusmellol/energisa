# Energisa — Website Audit

> Audit date: 2026-04-28
> Audited by: Claude (UX, Copy & Performance Audit)
> Pages reviewed: 1 (SPA — 6 seções)
> Site URL: https://mateusmellol.github.io/energisa/
> Foco: Performance · Copy · UX

---

## Executive Summary

O site tem um nível visual alto e uma narrativa clara de marca. A estrutura de seções funciona bem — Hero → Serviços → Impacto → Timeline → Ecossistema — e o design system é consistente. Os problemas críticos estão todos no código, não no design: as imagens da seção Ecossistema apontam para URLs da API do Figma (que **não funcionam em produção**), o menu mobile tem uma variável undefined que causa crash em runtime, e o HTML está declarado como `lang="en"` em um site inteiramente em PT-BR. Fora isso, há issues de performance notáveis (VoxelGlobe sem lazy em mobile, sem preload de fonte, GridPattern repetido) e dois erros de copy que afetam credibilidade.

---

## 🔴 Critical Issues (corrigir antes do próximo deploy)

### 1. Imagens do Ecossistema apontam para URLs do Figma API
**Arquivo:** `src/app/components/Ecossistema.tsx`, linhas 10–19

Todas as imagens de background e logos do Ecossistema usam URLs do tipo:
```
https://www.figma.com/api/mcp/asset/b5dd4e22-...
```
Essas URLs requerem autenticação e **não carregam em produção** (resultado: cards com background vazio ou logo quebrado). As imagens precisam ser exportadas, colocadas em `/public/` ou num CDN, e referenciadas com caminhos relativos.

**Afeta:** FlexLab (bg + 2 logos), S-Gás (bg + logo), (re)energisa (3 bgs + logo) — 8 assets no total.

---

### 2. Bug de runtime: menu mobile usa variável `navLinks` indefinida
**Arquivo:** `src/app/components/Header.tsx`, linha 143

```tsx
// Bug — navLinks não existe neste escopo
{navLinks.map((link) => (

// Correto — já importado no topo do arquivo
{NAV_LINKS.map((link) => (
```

O componente importa `NAV_LINKS` (correto, usado no desktop), mas o drawer mobile referencia `navLinks` (minúsculo, não definido em lugar nenhum). Isso causa um `ReferenceError` que quebra o menu mobile inteiramente. O button de CTA também precisa da mesma correção: `scrollTo(link.href.replace("#", ""))` → `scrollTo(getSectionId(link.href))`.

---

### 3. `lang="en"` num site inteiramente em PT-BR
**Arquivo:** `index.html`, linha 3

```html
<!-- Atual -->
<html lang="en">

<!-- Correto -->
<html lang="pt-BR">
```

Afeta leitores de tela, ferramentas de tradução automática e SEO. O Google usa o atributo `lang` para indexação regional.

---

## 🟡 Important Issues (corrigir na próxima sprint)

### 4. Typo: "distribution" (inglês) na descrição de (re)energisa
**Arquivo:** `src/app/components/Ecossistema.tsx`, linha 131

```
// Atual (errado)
"Modernização da rede elétrica para uma distribution de energia..."

// Correto
"Modernização da rede elétrica para uma distribuição de energia..."
```

Palavra em inglês no meio de copy em português. Baixa credibilidade.

---

### 5. Ponto final faltando no body da aba "Futuro" (Timeline)
**Arquivo:** `src/app/components/Timeline.tsx`, linha 38

```
// Atual
"...estamos redefinindo como o Brasil se conecta"

// Correto
"...estamos redefinindo como o Brasil se conecta."
```

---

### 6. Sem meta description nem OG tags
**Arquivo:** `index.html`

O `<head>` tem apenas `<title>Energisa</title>`. Sem:
- `<meta name="description">`
- `<meta property="og:title">` / `og:description` / `og:image`
- `<meta name="twitter:card">`

Quando alguém compartilhar o link, não haverá preview. Para um site de marca, isso é uma oportunidade perdida.

**Sugestão de adição:**
```html
<meta name="description" content="A Energisa conecta famílias e impulsiona comunidades — presente em 939 municípios e 97% do território brasileiro." />
<meta property="og:title" content="Energisa — Move o Brasil" />
<meta property="og:description" content="De Norte a Sul. Quando uma luz acende, a Energisa está por trás." />
```

---

### 7. Scroll lock na seção Statistics: UX disruptivo
**Arquivo:** `src/app/components/Statistics.tsx`, linhas 38–47 e 57–78

Quando a seção "Impacto" entra na viewport, o código bloqueia **todos** os inputs de scroll por 1.800ms (wheel, touchmove, keyboard). Isso inclui usuários de teclado e de tecnologias assistivas — potencial violação de WCAG 2.1.

Além disso, o efeito só é percebido em viewports grandes onde o threshold de 0.6 é atingido. Em telas menores ou com scroll rápido, o lock dispara mid-scroll e congela a tela abruptamente.

**Recomendação:** Remover o scroll lock completamente. As animações de number ticker + barra já são suficientes para atrair atenção; o lock cria atrito sem adicionar valor real.

---

### 8. VoxelGlobe (WebGL) renderizado em mobile sem restrição
**Arquivo:** `src/app/components/Timeline.tsx`, linhas 263–268

O `TimelineMobile` renderiza `<VoxelGlobe>` dentro de um `<Canvas>` Three.js em 65svh, sem nenhuma verificação de suporte ou fallback. Em dispositivos mobile de baixo custo, isso pode:
- Causar drop significativo de FPS durante o scroll
- Crashar navegadores sem suporte WebGL2
- Drenar bateria rapidamente

**Recomendação:** Adicionar um fallback de imagem estática para mobile (ou reduzir drasticamente os parâmetros `LAT_STEPS`/`LON_STEPS` numa versão mobile do globe), e envolver em `try/catch` ou `Suspense` com fallback visual.

---

### 9. Fonte Sora sem preload
**Arquivo:** `index.html`

Sora é usada em **todos** os elementos textuais do site. Não há `<link rel="preload">` para a fonte no HTML, o que causa FOUT (flash of unstyled text) na primeira carga.

**Adição recomendada:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&display=swap" />
```

---

### 10. Button "Mais" na seção Serviços não faz nada
**Arquivo:** `src/app/components/Services.tsx`, linhas 224–231

```tsx
<button onClick={(e) => e.preventDefault()}>
  Mais
</button>
```

O botão existe visualmente, mas o handler só previne o default sem nenhuma ação. Para o usuário, parece um link quebrado. Ou implementar a ação (expandir lista de serviços, navegar para página completa) ou remover o botão.

---

## 🟢 Nice to Have (polish quando possível)

### 11. GridPattern renderizado 5 vezes sem otimização
**Componentes:** Services, Statistics (×2), Timeline, Ecossistema

O `<GridPattern>` gera um SVG de grid de escala completa em cada seção. São 5 instâncias de SVG no DOM simultaneamente. Considerar extrair para um único layer de fundo no `App.tsx` com posicionamento absoluto, ou converter para um background CSS pattern (`background-image: repeating-linear-gradient(...)`) que é GPU-acelerado e sem custo de DOM.

---

### 12. Inconsistência de copy entre desktop e mobile na seção Impacto
**Arquivo:** `src/app/components/Statistics.tsx`

- **Desktop (linha 154):** "Conectamos famílias e impulsionamos comunidades ao redor do Brasil"
- **Mobile (linha 318):** "A Energisa distribui energia em 97% do território brasileiro."

São textos completamente diferentes para a mesma seção. A versão desktop é mais emocional e alinhada com o tom do restante do site. Unificar os dois.

---

### 13. Copy do Hero: "por trás" tem conotação ambígua
**Arquivo:** `src/app/components/Hero.tsx`, linha 102

> "Quando uma luz acende, a Energisa está por trás."

"Por trás" em PT-BR pode soar como algo escondido ou negativo. Sugestão mais clara e positiva:

> "Quando uma luz acende, a Energisa está lá."

Ou, com mais energia:

> "Quando uma luz acende, é a Energisa que faz acontecer."

---

### 14. Stock widget com dados hardcoded
**Arquivo:** `src/app/components/Hero.tsx`, linhas 13–16

Preço "51,27" e delta "0,32 (0,83%)" são valores fixos. Num site de marca real, isso vai envergonhar quando o preço estiver diferente. Para produção: integrar via API de mercado (B3) ou remover o componente se não for possível manter atualizado.

---

### 15. Links do footer todos apontam para "#"
**Arquivo:** `src/app/components/Footer.tsx`, linhas 15–28

Colunas "Serviços" (Residencial, Empresarial, Agronegócio, Mobilidade Elétrica) e "Legal" (Política de Privacidade, Termos de Uso, LGPD) têm `href="#"`. Para um site ao vivo, pelo menos as páginas de Legal precisam existir.

---

## Priority Action Plan

| Prioridade | Ação | Tipo | Componente |
|---|---|---|---|
| 🔴 CRITICAL | Exportar imagens do Ecossistema para `/public/` | Bug | `Ecossistema.tsx` |
| 🔴 CRITICAL | Corrigir `navLinks` → `NAV_LINKS` no mobile drawer | Bug | `Header.tsx:143` |
| 🔴 CRITICAL | Mudar `lang="en"` → `lang="pt-BR"` | Acessibilidade/SEO | `index.html` |
| 🟡 IMPORTANT | Corrigir typo "distribution" → "distribuição" | Copy | `Ecossistema.tsx:131` |
| 🟡 IMPORTANT | Adicionar ponto final no body "Futuro" | Copy | `Timeline.tsx:38` |
| 🟡 IMPORTANT | Adicionar meta description + OG tags | SEO | `index.html` |
| 🟡 IMPORTANT | Remover scroll lock da seção Statistics | UX | `Statistics.tsx` |
| 🟡 IMPORTANT | Adicionar fallback/imagem estática para VoxelGlobe mobile | Performance | `Timeline.tsx` |
| 🟡 IMPORTANT | Adicionar preload da fonte Sora | Performance | `index.html` |
| 🟡 IMPORTANT | Implementar ou remover o botão "Mais" em Serviços | UX | `Services.tsx:224` |
| 🟢 NICE | Consolidar GridPattern para 1 instância no App | Performance | `App.tsx` |
| 🟢 NICE | Unificar copy do subtítulo desktop/mobile em Statistics | Copy | `Statistics.tsx` |
| 🟢 NICE | Revisar "por trás" no copy do Hero | Copy | `Hero.tsx:102` |
| 🟢 NICE | Avaliar integração real ou remoção do StockWidget | UX | `Hero.tsx` |
