import { createFileRoute } from "@tanstack/react-router";
import { AgentsTable } from "@/components/dashboard/agents-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/agents")({
  head: () => ({
    meta: [
      { title: "Agentes — Painel de Agentes IA" },
      { name: "description", content: "Gerencie todos os agentes de IA da sua operação." },
    ],
  }),
  component: AgentsPage,
});

function AgentsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Agentes</h1>
          <p className="text-sm text-muted-foreground">
            Crie, treine e monitore seus agentes inteligentes.
          </p>
        </div>
        <Button className="gap-2 self-start sm:self-auto">
          <Plus className="h-4 w-4" /> Novo agente
        </Button>
      </div>
      <AgentsTable />
    </div>
  );
}
