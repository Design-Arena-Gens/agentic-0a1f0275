"use client";

import { useMemo } from "react";
import { type LucideIcon, BarChart2, CheckCircle2, ClipboardList } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Insight = {
  id: string;
  label: string;
  value: string;
  context: string;
};

type MetricCardsProps = {
  insights: Insight[];
};

const iconMap: Record<number, LucideIcon> = {
  0: ClipboardList,
  1: BarChart2,
  2: CheckCircle2,
};

export function MetricCards({ insights }: MetricCardsProps) {
  const items = useMemo(() => insights.slice(0, 3), [insights]);

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {items.map((item, index) => {
        const Icon = iconMap[index] ?? ClipboardList;
        return (
          <Card
            key={item.id}
            className={cn(
              "relative overflow-hidden rounded-2xl border border-muted-foreground/10 bg-white p-6 shadow-sm transition hover:shadow-md",
              index === 0 && "bg-gradient-to-br from-emerald-100/70 via-white to-white"
            )}
          >
            <div className="inline-flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <Icon className="size-5" />
            </div>
            <p className="mt-4 text-sm font-medium text-muted-foreground uppercase tracking-wide">
              {item.label}
            </p>
            <p className="mt-2 text-3xl font-semibold">{item.value}</p>
            <p className="mt-2 text-sm text-muted-foreground">{item.context}</p>
          </Card>
        );
      })}
    </div>
  );
}
