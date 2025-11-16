"use client";

import { ClipboardCheck, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type Milestone = {
  id: string;
  title: string;
  site: string;
  due: string;
  owner: string;
  status: string;
};

type ComplianceRoadmapProps = {
  milestones: Milestone[];
};

export function ComplianceRoadmap({ milestones }: ComplianceRoadmapProps) {
  return (
    <Card className="space-y-4 rounded-2xl border border-muted-foreground/10 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Compliance Planner
          </p>
          <h3 className="mt-1 text-2xl font-semibold">AI-staged action bundles</h3>
        </div>
        <Badge variant="outline" className="gap-1 rounded-full">
          <Sparkles className="size-3 text-emerald-500" />
          Review & Release
        </Badge>
      </div>
      <Separator />
      <div className="space-y-5">
        {milestones.map((item) => (
          <div key={item.id} className="grid gap-2 rounded-2xl border border-dashed border-muted-foreground/20 bg-slate-50/60 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase">
              <ClipboardCheck className="size-4 text-emerald-500" />
              {item.status}
            </div>
            <h4 className="text-lg font-semibold text-foreground">{item.title}</h4>
            <p className="text-sm text-muted-foreground">{item.site}</p>
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground/80">
              <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-emerald-700">
                Due {item.due}
              </span>
              <span className="text-sm">{item.owner}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="h-12 rounded-2xl bg-gradient-to-r from-emerald-100/60 via-transparent to-emerald-100/60" />
    </Card>
  );
}
