import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { agents, type AgentStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const statusStyles: Record<AgentStatus, string> = {
  ativo: "bg-success/15 text-success border-success/30",
  treinando: "bg-primary/10 text-primary border-primary/30",
  pausado: "bg-muted text-muted-foreground border-border",
};

export function AgentsTable() {
  return (
    <Card className="border-border/70 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Seus agentes</CardTitle>
        <p className="text-sm text-muted-foreground">
          Desempenho dos agentes nos últimos 7 dias
        </p>
      </CardHeader>
      <CardContent className="px-0 sm:px-2">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agente</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Conversas</TableHead>
                <TableHead className="text-right">Resolução</TableHead>
                <TableHead className="text-right hidden md:table-cell">Atualizado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                        {a.name.slice(0, 2)}
                      </div>
                      {a.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{a.role}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("capitalize", statusStyles[a.status])}>
                      {a.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {a.conversations.toLocaleString("pt-BR")}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{a.resolution}%</TableCell>
                  <TableCell className="text-right text-muted-foreground hidden md:table-cell">
                    {a.updatedAt}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
