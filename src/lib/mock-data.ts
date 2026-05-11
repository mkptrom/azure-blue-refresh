export type AgentStatus = "ativo" | "pausado" | "treinando";

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  conversations: number;
  resolution: number;
  updatedAt: string;
}

export const agents: Agent[] = [
  { id: "1", name: "Aria", role: "Atendimento ao cliente", status: "ativo", conversations: 1284, resolution: 92, updatedAt: "há 2 min" },
  { id: "2", name: "Nova", role: "Vendas e qualificação", status: "ativo", conversations: 876, resolution: 88, updatedAt: "há 12 min" },
  { id: "3", name: "Lumi", role: "Suporte técnico N1", status: "treinando", conversations: 412, resolution: 74, updatedAt: "há 1 h" },
  { id: "4", name: "Orion", role: "Pós-venda", status: "ativo", conversations: 624, resolution: 85, updatedAt: "há 3 h" },
  { id: "5", name: "Vega", role: "Onboarding", status: "pausado", conversations: 198, resolution: 67, updatedAt: "ontem" },
  { id: "6", name: "Atlas", role: "FAQ institucional", status: "ativo", conversations: 1503, resolution: 95, updatedAt: "há 5 min" },
];

export const conversationsSeries = [
  { day: "Seg", conversas: 320, resolvidas: 290 },
  { day: "Ter", conversas: 412, resolvidas: 378 },
  { day: "Qua", conversas: 389, resolvidas: 360 },
  { day: "Qui", conversas: 510, resolvidas: 470 },
  { day: "Sex", conversas: 602, resolvidas: 555 },
  { day: "Sáb", conversas: 287, resolvidas: 260 },
  { day: "Dom", conversas: 198, resolvidas: 182 },
];

export const recentActivity = [
  { id: "a1", who: "Aria", what: "resolveu 12 tickets", when: "há 5 min" },
  { id: "a2", who: "Nova", what: "qualificou 3 leads quentes", when: "há 18 min" },
  { id: "a3", who: "Atlas", what: "atualizou base de conhecimento", when: "há 42 min" },
  { id: "a4", who: "Orion", what: "encerrou 8 atendimentos", when: "há 1 h" },
  { id: "a5", who: "Lumi", what: "iniciou ciclo de treinamento", when: "há 2 h" },
];

export const kpis = [
  { label: "Conversas hoje", value: "2.418", delta: "+12,4%", positive: true },
  { label: "Agentes ativos", value: "6", delta: "+1", positive: true },
  { label: "Taxa de resolução", value: "89%", delta: "+3,2%", positive: true },
  { label: "Tempo médio", value: "1m 24s", delta: "-8s", positive: true },
];
