
## Contexto

White-label de **agente de IA para imobiliárias** (MVP). Cada imobiliária terá seu painel para acompanhar o agente que atende leads no WhatsApp, qualifica e agenda visitas no Google Calendar. O n8n é o motor; o painel é a interface de acompanhamento e configuração.

```text
Lead WhatsApp ─► n8n (agente IA) ─┬─► Supabase  (leads, mensagens, visitas)
                                  └─► Google Calendar  (agenda do corretor)

Corretor / Gestor ─► Painel Lovable ─► Supabase Auth + DB
```

Como é MVP, mantemos o escopo enxuto: 1 imobiliária por conta (multi-tenant fica para depois), foco em **ver o que o agente está fazendo** e **ajustar o essencial**.

## 1. Ativar Lovable Cloud

Postgres + Auth + Storage sem conta externa.

## 2. Modelo de dados (MVP)

Renomeado para o vocabulário de imobiliária. RLS habilitada em todas, escopo por `user_id` (corretor/gestor logado).

```text
profiles          (id = auth.users.id, full_name, agency_name, phone, avatar_url)
user_roles        (user_id, role: admin | corretor)   -- tabela separada, has_role() SECURITY DEFINER

leads             (id, user_id, name, phone (remotejid), source, stage:
                   novo | qualificando | agendado | visitou | fechado | perdido,
                   interest_notes, budget_min, budget_max, neighborhoods text[],
                   last_interaction_at, created_at)

messages          (id, lead_id, direction: in|out, content, content_type,
                   timestamp, agent_run_id nullable)

visits            (id, lead_id, property_ref, scheduled_at, status:
                   confirmada | realizada | cancelada | no_show,
                   google_event_id, notes)

agent_runs        (id, lead_id, started_at, ended_at, resolved bool,
                   tokens_in, tokens_out, latency_ms)

agent_settings    (id = user_id, system_prompt, model, greeting,
                   working_hours jsonb, calendar_id, paused bool)
```

Trigger `on_auth_user_created` → cria `profiles` + `agent_settings` padrão.

## 3. Auth + login

- `/login`, `/signup`, `/reset-password` (públicas, email/senha + Google via broker Lovable).
- Layout `src/routes/_authenticated.tsx` com `beforeLoad` redirecionando para `/login`.
- Rotas atuais movidas para dentro de `_authenticated/`.
- `onAuthStateChange` no `__root.tsx` invalida React Query.
- Topbar: avatar + nome da imobiliária + Sair.

## 4. Camada de dados

- `src/lib/mock-data.ts` → server functions em `src/lib/*.functions.ts` (`requireSupabaseAuth`).
- `getKpis`, `listLeads`, `getLead`, `updateLead`, `listVisits`, `updateVisit`, `getAgentSettings`, `updateAgentSettings`, `triggerN8n`.
- React Query + realtime do Supabase nas telas de Conversas e Dashboard.

## 5. Telas (adaptação do que já existe)

| Rota atual | Vira | Conteúdo |
|---|---|---|
| `/` Dashboard | Dashboard | KPIs: leads novos hoje, em qualificação, visitas agendadas (7d), taxa de agendamento. Gráfico de leads/dia, atividade recente, top bairros buscados. |
| `/agents` | **Meu agente** (singular, MVP) | Form de `agent_settings`: prompt, saudação, horário de atendimento, modelo, calendar_id, botão Pausar/Ativar. |
| `/conversations` | **Leads** | Lista de leads com filtros (stage, período, busca por nome/telefone) + painel lateral com histórico de `messages` e ações (mudar stage, marcar perdido, abrir no WhatsApp). |
| `/analytics` | Analytics | Funil (novo → qualificando → agendado → visitou → fechado), volume por hora, taxa de resposta do agente, custo estimado de tokens. |
| `/settings` | Configurações | Dados da imobiliária + integrações (URL/token do webhook n8n, ID do Google Calendar, número do WhatsApp). |
| — | **Visitas** (nova) | Lista/calendário das `visits`, status, link para o evento no Google Calendar. |

## 6. Integração com o n8n

O n8n grava direto no Supabase (sem mudar a essência do workflow do zip). Documentação em `docs/n8n-integration.md`:

1. Credencial **Supabase** no n8n (URL + service role key).
2. Após `Normalizacao`: nó **Supabase upsert** em `leads` (chave `phone`, com `user_id` da imobiliária dona).
3. Insert em `messages` (direction `in`) ao receber; insert (direction `out`) após o nó que responde.
4. Quando o agente decidir agendar: insert em `visits` + criar evento no Google Calendar, gravando `google_event_id`.
5. Ao final: insert em `agent_runs` (tokens, latência, resolvido).

Painel → n8n (mão contrária, opcional MVP): `triggerN8n(action, payload)` faz POST autenticado para o webhook do n8n. Usado para ações pontuais (ex.: reenviar mensagem manual, "assumir" lead).

## 7. Multi-imobiliária (white label)

MVP: cada conta = 1 imobiliária. `user_id` em todas as tabelas é o discriminador, RLS garante isolamento. Quando virar multi-usuário por imobiliária, evoluímos para `agency_id` + `agency_members` (fora de escopo agora).

Branding mínimo do white label já no MVP: nome da imobiliária e logo (upload em Storage) aparecem na sidebar/topbar/login.

## 8. Secrets

- `N8N_WEBHOOK_URL`
- `N8N_WEBHOOK_TOKEN`

(Service role do Supabase fica do lado do n8n; Google Calendar também.)

## 9. Entregáveis

1. Migrations com schema + RLS + `has_role()` + trigger de profile/settings.
2. Auth (`/login`, `/signup`, `/reset-password`) + layout `_authenticated`.
3. Server functions substituindo os mocks.
4. Telas renomeadas/adaptadas para o vocabulário imobiliário (Leads, Visitas, Meu agente).
5. Branding básico (logo + nome da imobiliária).
6. `docs/n8n-integration.md` com os 5 nós Supabase a adicionar no workflow do zip.

## Fora de escopo (pós-MVP)

- Multi-usuário por imobiliária + permissões granulares.
- Catálogo de imóveis dentro do painel (hoje o agente recebe via prompt/planilha externa).
- Billing/planos.
- Importação automática do JSON do n8n por imobiliária.
- App mobile / push.
