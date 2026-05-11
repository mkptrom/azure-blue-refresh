import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { recentActivity } from "@/lib/mock-data";

export function RecentActivity() {
  return (
    <Card className="border-border/70 shadow-sm h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Atividade recente</CardTitle>
        <p className="text-sm text-muted-foreground">Últimas ações dos agentes</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentActivity.map((a) => (
          <div key={a.id} className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
              {a.who.slice(0, 2)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-snug">
                <span className="font-medium">{a.who}</span>{" "}
                <span className="text-muted-foreground">{a.what}</span>
              </p>
              <p className="text-xs text-muted-foreground">{a.when}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
