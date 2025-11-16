"use client";

import { AlertTriangle, ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Incident = {
  id: string;
  site: string;
  type: string;
  severity: string;
  date: string;
  status: string;
};

type IncidentTableProps = {
  incidents: Incident[];
};

const severityTone: Record<string, string> = {
  Critical: "bg-rose-100 text-rose-700",
  Moderate: "bg-amber-100 text-amber-700",
  Low: "bg-emerald-100 text-emerald-700",
};

export function IncidentTable({ incidents }: IncidentTableProps) {
  return (
    <Card className="rounded-2xl border border-muted-foreground/10 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Incident Log
          </p>
          <h3 className="mt-1 text-2xl font-semibold">Farmer-led reviews</h3>
        </div>
        <Badge variant="outline" className="gap-1 rounded-full">
          <AlertTriangle className="size-4 text-amber-600" />
          Verify before close-out
        </Badge>
      </div>
      <div className="mt-4 overflow-hidden rounded-2xl border border-dashed border-muted-foreground/20">
        <Table>
          <TableHeader className="bg-slate-50/70">
            <TableRow className="hover:bg-transparent">
              <TableHead className="uppercase tracking-wide text-muted-foreground">
                Case
              </TableHead>
              <TableHead className="uppercase tracking-wide text-muted-foreground">
                Site
              </TableHead>
              <TableHead className="uppercase tracking-wide text-muted-foreground">
                Type
              </TableHead>
              <TableHead className="uppercase tracking-wide text-muted-foreground">
                Severity
              </TableHead>
              <TableHead className="uppercase tracking-wide text-muted-foreground">
                Status
              </TableHead>
              <TableHead className="uppercase tracking-wide text-muted-foreground">
                When
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {incidents.map((incident) => (
              <TableRow key={incident.id} className="hover:bg-emerald-50/40">
                <TableCell className="font-medium text-foreground">
                  {incident.id}
                </TableCell>
                <TableCell>{incident.site}</TableCell>
                <TableCell className="text-muted-foreground">{incident.type}</TableCell>
                <TableCell>
                  <Badge
                    className={`rounded-full ${severityTone[incident.severity] ?? "bg-muted text-foreground"}`}
                  >
                    {incident.severity}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{incident.status}</TableCell>
                <TableCell className="flex items-center gap-1 text-muted-foreground">
                  {incident.date}
                  <ArrowUpRight className="size-4 text-emerald-600" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
