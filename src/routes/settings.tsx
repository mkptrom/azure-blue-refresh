import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Configurações — Painel de Agentes IA" },
      { name: "description", content: "Ajuste preferências da conta e do workspace." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Configurações</h1>
        <p className="text-sm text-muted-foreground">Ajustes da conta e do workspace.</p>
      </div>

      <Card className="border-border/70 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Workspace</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="ws">Nome do workspace</Label>
            <Input id="ws" defaultValue="Minha Operação" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">E-mail de contato</Label>
            <Input id="email" type="email" defaultValue="contato@exemplo.com" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/70 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Notificações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { id: "n1", label: "Resumo diário por e-mail", on: true },
            { id: "n2", label: "Alertas de queda na resolução", on: true },
            { id: "n3", label: "Novos leads qualificados", on: false },
          ].map((n) => (
            <div key={n.id} className="flex items-center justify-between">
              <Label htmlFor={n.id} className="font-normal">{n.label}</Label>
              <Switch id={n.id} defaultChecked={n.on} />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Salvar alterações</Button>
      </div>
    </div>
  );
}
