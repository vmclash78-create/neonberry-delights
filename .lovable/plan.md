

# Reformulacao Completa: E-commerce de Brownies

Transformacao total do site de acaiteria para um e-commerce profissional de brownies com identidade visual em tons de marrom, chocolate e dourado.

---

## O que muda

### 1. Identidade Visual — Paleta Chocolate Premium
Substituir toda a paleta neon roxo/ciano por tons quentes de brownie:
- **Primary**: Marrom chocolate escuro `hsl(25, 55%, 30%)`
- **Accent**: Dourado caramelo `hsl(35, 80%, 55%)`
- **Background light**: Creme `hsl(30, 30%, 96%)`
- **Background dark**: Chocolate intenso `hsl(25, 30%, 8%)`
- Remover efeitos neon/glow, substituir por sombras quentes e suaves
- Gradientes: chocolate escuro → caramelo dourado
- Manter glassmorphism com tons quentes
- Atualizar `src/index.css` (todas as CSS variables) e `tailwind.config.ts`

### 2. Dados dos Produtos — Brownies
Reescrever `src/data/mock-data.ts` completamente:
- **Categorias**: Brownies Classicos, Brownies Premium, Brownies Recheados, Combos
- **~12 Produtos**: Brownie Tradicional, Brownie Nutella, Brownie Red Velvet, Brownie Pistache, etc. com tamanhos (Individual, Medio, Grande) em vez de ml
- **Toppings**: Cobertura de chocolate, Sorvete, Chantilly, Calda de caramelo, etc.
- **Complements**: Nozes, Castanhas, M&Ms, Frutas vermelhas
- **Store Settings**: Nome "Brownie & Co." com cores atualizadas, WhatsApp, PIX
- Emoji de grape 🍇 → 🍫 em todo o codigo

### 3. Tipos — Ajuste ProductSize
Em `src/types/index.ts`, renomear campo `ml` para `weight` (gramas) no `ProductSize`, pois brownies usam peso, nao volume.

### 4. Componentes do Cliente
Todos os arquivos em `src/components/customer/`:
- **Hero.tsx**: Texto "O melhor brownie artesanal da cidade", CTA "Peca seu Brownie", remover referencias a acai
- **Header.tsx**: Logo "Brownie & Co.", placeholder de busca adaptado
- **ProductGrid.tsx**: Emoji 🍫, remover texto "Destaque" por badge marrom
- **ProductModal.tsx**: Emoji 🍫, labels "Tamanho" com gramas em vez de ml, texto adaptado
- **CartDrawer.tsx**: Emoji 🍫, textos adaptados
- **CheckoutPage.tsx**: Mensagem WhatsApp com "Pedido Brownie & Co.", PIX key atualizada
- **FeaturedCarousel.tsx**: Adaptar visual
- **CategoryChips.tsx**: Sem mudanca estrutural (dados vem do mock)
- **BottomNav.tsx**: Manter estrutura, possivelmente ajustar icones

### 5. Admin — Textos e Visual
- **AdminLogin.tsx**: Nome "Brownie & Co. Admin"
- **AdminDashboard.tsx**: Titulo adaptado
- **AdminSidebar.tsx**: Logo adaptado
- **AdminSettings.tsx**: Valores default brownie
- Demais admin: mudancas minimas (dados vem do mock)

### 6. Contextos
- **CartContext.tsx**: Mudar localStorage key de `neonberry-cart` para `brownie-cart`
- **StoreContext.tsx**: Sem mudanca estrutural (puxa do mock)

### 7. Imagens Placeholder
Usar emojis tematicos (🍫🍪🎂) como placeholder visual nos cards e modais, com gradientes chocolate em vez de roxo/ciano.

### 8. CSS Utilities
Renomear/atualizar em `src/index.css`:
- `.neon-glow` → `.warm-glow` com sombra marrom/dourada
- `.gradient-neon` → `.gradient-chocolate` (marrom escuro → caramelo)
- `.text-gradient-neon` → `.text-gradient-chocolate`
- `.cyan-glow` → `.caramel-glow`

---

## Arquivos Modificados (resumo)
| Arquivo | Tipo de Mudanca |
|---|---|
| `src/index.css` | Paleta completa + utilities |
| `tailwind.config.ts` | Keyframes/animacoes com novas cores |
| `src/data/mock-data.ts` | Reescrita total (brownies) |
| `src/types/index.ts` | `ml` → `weight` no ProductSize |
| `src/components/customer/*` | Textos, emojis, classes CSS |
| `src/components/admin/*` | Textos e branding |
| `src/contexts/CartContext.tsx` | localStorage key |
| `src/hooks/useProducts.ts` | Sem mudanca |
| `src/hooks/useCheckout.ts` | Sem mudanca |

---

## Resultado Esperado
Um e-commerce elegante e profissional de brownies artesanais, com visual quente em tons de chocolate e caramelo, experiencia mobile-first estilo iFood, mantendo toda a funcionalidade existente (carrinho, checkout WhatsApp, PIX, admin).

