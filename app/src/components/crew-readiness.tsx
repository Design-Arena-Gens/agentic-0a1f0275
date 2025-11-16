"use client";

import { Check, ShieldAlert } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type Crew = {
  name: string;
  focus: string;
  readiness: number;
  blockers: string[];
};

type CrewReadinessProps = {
  crews: Crew[];
};

export function CrewReadiness({ crews }: CrewReadinessProps) {
  return (
    <Card className="space-y-4 rounded-2xl border border-muted-foreground/10 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Crew Readiness
          </p>
          <h3 className="mt-1 text-2xl font-semibold">Human-in-the-loop status</h3>
        </div>
        <Badge variant="outline" className="rounded-full bg-emerald-50 text-emerald-700">
          <Check className="mr-1 size-4" />
          AI trusted handoff
        </Badge>
      </div>
      <div className="space-y-5">
        {crews.map((crew) => (
          <div key={crew.name} className="space-y-3 rounded-2xl border border-dashed border-muted-foreground/30 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold text-foreground">{crew.name}</h4>
                <p className="text-sm text-muted-foreground">{crew.focus}</p>
              </div>
              <Badge variant="secondary" className="rounded-full bg-white text-xs font-medium uppercase tracking-wide">
                {crew.readiness}%
              </Badge>
            </div>
            <Progress value={crew.readiness} className="h-2 rounded-full bg-emerald-100" />
            <div className="space-y-1 text-sm text-muted-foreground">
              {crew.blockers.map((blocker) => (
                <div key={blocker} className="flex items-start gap-2 rounded-xl bg-white px-3 py-2 shadow-inner">
                  <ShieldAlert className="mt-0.5 size-4 text-amber-500" />
                  <span>{blocker}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
