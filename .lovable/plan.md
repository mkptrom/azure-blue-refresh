
## Objetivo

Substituir a página placeholder por um **dashboard de Agentes de IA** com visual branco + azul corporativo (estilo Stripe/Linear), totalmente responsivo.

## Design system (branco + azul corporativo)

Atualizar `src/styles.css` com tokens em `oklch`:

- `--background`: branco puro
- `--foreground`: cinza-azulado quase preto (#0B1220)
- `--primary`: azul #2563EB (CTAs, links, destaques)
- `--primary-foreground`: branco
- `--secondary` / `--muted`: cinza muito claro (#F5F7FA) para superfícies de cards e sidebar
- `--accent`: azul claro (#EFF4FF) para hover/estado ativo
- `--border`: cinza-azulado suave (#E4E9F2)
- `--ring`: azul primário
- `--chart-1..5`: variações de azul + 1 ciano para gráficos
- Tipografia: **Inter** (corpo) + pesos 600/700 para títulos. Radius `0.75rem`.
- Modo escuro: manter, mas foco no claro.

## Estrutura de rotas

Sidebar fixa + topbar, conteúdo via `<Outlet />`. Criar:

- `src/routes/__root.tsx` → envolver `Outlet` com `SidebarProvider`, `AppSidebar` e header com `SidebarTrigger`.
- `src/routes/index.tsx` → **Dashboard** (visão geral)
- `src/routes/agents.tsx` → Lista de agentes
- `src/routes/conversations.tsx` → Conversas/atendimentos
- `src/routes/analytics.tsx` → Métricas detalhadas
- `src/routes/settings.tsx` → Configurações

Cada rota com `head()` próprio (title + description) para SEO.

## Componentes a criar

- `src/components/app-sidebar.tsx` — sidebar shadcn `collapsible="icon"` com logo, grupos "Visão geral / Operação / Conta", ícones lucide, item ativo destacado em azul.
- `src/components/dashboard/stat-card.tsx` — card de KPI (label, valor, delta %, mini-sparkline).
- `src/components/dashboard/agents-table.tsx` — tabela de agentes com status (badge azul/verde/cinza).
- `src/components/dashboard/conversations-chart.tsx` — `recharts` AreaChart usando tons de azul.
- `src/components/dashboard/recent-activity.tsx` — lista de atividades recentes.
- `src/components/topbar.tsx` — search, notificações, avatar.

## Conteúdo do Dashboard (index)

```text
┌──────────────────────────────────────────┐
│ Header: título + botão "Novo agente"     │
├──────────────────────────────────────────┤
│ [KPI] [KPI] [KPI] [KPI]   ← grid 1/2/4   │
├──────────────────────────────────────────┤
│ AreaChart conversas (col-span-2) │ Lista │
│                                  │ ativ. │
├──────────────────────────────────────────┤
│ Tabela "Seus agentes" (full width)       │
└──────────────────────────────────────────┘
```

KPIs sugeridos: Conversas hoje, Agentes ativos, Taxa de resolução, Tempo médio de resposta. Dados mockados.

## Responsividade

- Mobile (<768px): sidebar vira offcanvas via `SidebarTrigger` no topbar; KPIs em 1 coluna; gráfico full-width; tabela com scroll horizontal.
- Tablet (768–1024): KPIs 2 colunas; sidebar colapsada em ícones.
- Desktop (≥1024): layout completo com sidebar expandida.
- Usar `w-[var(--sidebar-width)]` (não `w-[--sidebar-width]`) para compatibilidade Tailwind 4.

## Detalhes técnicos

- Animações sutis com `framer-motion` (fade/slide nos cards ao montar).
- Ícones: `lucide-react` (Bot, MessageSquare, BarChart3, Settings, etc.).
- Gráficos: `recharts` com gradiente azul (`#2563EB` → transparente).
- Sem backend — dados mockados em arquivos `src/lib/mock-data.ts`.
- Atualizar metadata raiz (`title`, `description`, `og:*`) para "Painel de Agentes IA".

## Fora de escopo

- Autenticação, Lovable Cloud, persistência (pode ser adicionado depois).
- Internacionalização — UI em PT-BR direto.
