import { createFileRoute } from "@tanstack/react-router";
import { ConversationsChart } from "@/components/dashboard/conversations-chart";
import { StatCard } from "@/components/dashboard/stat-card";
import { kpis } from "@/lib/mock-data";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — Painel de Agentes IA" },
      { name: "description", content: "Métricas detalhadas de performance dos seus agentes de IA." },
    ],
  }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Analytics</h1>
        <p className="text-sm text-muted-foreground">Métricas detalhadas da operação.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k, i) => (
          <StatCard key={k.label} index={i} {...k} />
        ))}
      </div>
      <ConversationsChart />
    </div>
  );
}
