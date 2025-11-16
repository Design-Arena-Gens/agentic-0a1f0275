"use client";

import { AlertTriangle, Wind, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type FieldCondition = {
  id: string;
  site: string;
  focus: string;
  riskDrivers: string[];
  aiAssist: string;
};

type FieldConditionsProps = {
  items: FieldCondition[];
};

export function FieldConditions({ items }: FieldConditionsProps) {
  return (
    <Card className="space-y-5 rounded-2xl border border-muted-foreground/10 bg-white p-6 shadow-sm">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Field Intel
        </p>
        <h3 className="mt-1 text-2xl font-semibold">Live hazard drivers</h3>
      </div>
      <div className="space-y-6">
        {items.map((condition) => (
          <div
            key={condition.id}
            className="rounded-2xl border border-dashed border-emerald-200 bg-gradient-to-br from-emerald-50/70 via-white to-emerald-50/40 p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
                <Wind className="size-4" />
                {condition.site}
              </div>
              <Badge variant="outline" className="rounded-full bg-white text-xs font-medium uppercase tracking-wide text-emerald-700">
                {condition.focus}
              </Badge>
            </div>
            <Separator className="my-3" />
            <div className="space-y-3">
              <div className="space-y-2">
                {condition.riskDrivers.map((driver) => (
                  <div
                    key={driver}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <AlertTriangle className="mt-1 size-4 text-amber-500" />
                    <span>{driver}</span>
                  </div>
                ))}
              </div>
              <div className="inline-flex items-start gap-2 rounded-xl bg-white px-3 py-2 text-sm text-emerald-700 shadow-inner">
                <Zap className="mt-0.5 size-4" />
                <span>{condition.aiAssist}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
