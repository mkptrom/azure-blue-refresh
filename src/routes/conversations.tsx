import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export const Route = createFileRoute("/conversations")({
  head: () => ({
    meta: [
      { title: "Conversas — Painel de Agentes IA" },
      { name: "description", content: "Acompanhe as conversas em andamento dos seus agentes." },
    ],
  }),
  component: ConversationsPage,
});

const items = Array.from({ length: 8 }).map((_, i) => ({
  id: i,
  user: ["Marina", "Lucas", "Beatriz", "Rafael", "Camila", "Diego", "Helena", "Igor"][i],
  agent: ["Aria", "Nova", "Atlas", "Orion"][i % 4],
  preview: "Olá, gostaria de entender melhor como funciona o…",
  when: `há ${i + 2} min`,
}));

function ConversationsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Conversas</h1>
        <p className="text-sm text-muted-foreground">Conversas recentes dos seus agentes.</p>
      </div>

      <Card className="border-border/70 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Em andamento</CardTitle>
        </CardHeader>
        <CardContent className="divide-y divide-border p-0">
          {items.map((c) => (
            <div key={c.id} className="flex items-start gap-3 p-4 hover:bg-muted/40 transition-colors">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MessageSquare className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium">
                    {c.user} <span className="text-muted-foreground">↔ {c.agent}</span>
                  </p>
                  <span className="shrink-0 text-xs text-muted-foreground">{c.when}</span>
                </div>
                <p className="truncate text-sm text-muted-foreground">{c.preview}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
