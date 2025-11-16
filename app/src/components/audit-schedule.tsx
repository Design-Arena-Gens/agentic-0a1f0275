"use client";

import { CalendarDays, MapPin, UserCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type AuditSlot = {
  site: string;
  focus: string;
  window: string;
  lead: string;
};

type AuditScheduleProps = {
  items: AuditSlot[];
};

export function AuditSchedule({ items }: AuditScheduleProps) {
  return (
    <Card className="flex h-full flex-col gap-4 rounded-2xl border border-muted-foreground/10 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Audit Calendar
          </p>
          <h3 className="mt-1 text-2xl font-semibold">Next 3 Iowa walkthroughs</h3>
        </div>
        <Badge variant="secondary" className="rounded-full bg-emerald-100 text-emerald-700">
          <CalendarDays className="mr-1 size-4" />
          Sync Outlook
        </Badge>
      </div>
      <Separator />
      <div className="space-y-4">
        {items.map((slot) => (
          <div
            key={slot.site}
            className="rounded-2xl border border-muted-foreground/20 bg-slate-50/70 p-4"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <MapPin className="size-4 text-emerald-600" />
              {slot.site}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{slot.focus}</p>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground/80">
              <Badge variant="outline" className="rounded-full bg-white text-xs font-medium uppercase tracking-wide">
                {slot.window}
              </Badge>
              <span className="inline-flex items-center gap-1 text-sm">
                <UserCheck className="size-4 text-emerald-600" />
                {slot.lead}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
