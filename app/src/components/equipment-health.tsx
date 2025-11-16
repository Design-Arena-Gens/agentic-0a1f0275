"use client";

import { Cog, Workflow } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type Equipment = {
  name: string;
  status: string;
  due: string;
};

type EquipmentHealthProps = {
  assets: Equipment[];
};

export function EquipmentHealth({ assets }: EquipmentHealthProps) {
  return (
    <Card className="space-y-4 rounded-2xl border border-muted-foreground/10 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Equipment Oversight
          </p>
          <h3 className="mt-1 text-2xl font-semibold">AI watchdog monitoring</h3>
        </div>
        <Badge variant="secondary" className="rounded-full bg-emerald-100 text-emerald-700">
          <Workflow className="mr-1 size-4" />
          Automations live
        </Badge>
      </div>
      <Separator />
      <div className="space-y-4">
        {assets.map((asset) => (
          <div key={asset.name} className="space-y-2 rounded-2xl border border-dashed border-muted-foreground/30 p-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Cog className="size-5 text-emerald-600" />
              {asset.name}
            </div>
            <p className="text-sm text-muted-foreground">{asset.status}</p>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {asset.due}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
