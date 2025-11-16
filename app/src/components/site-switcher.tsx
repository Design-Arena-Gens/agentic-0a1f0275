"use client";

import { useMemo, useState } from "react";
import { Building2, ChevronDown, MapPin, Waves } from "lucide-react";

import { CommandDialog, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Site } from "@/data/mock-data";

type SiteSwitcherProps = {
  sites: Site[];
  value: Site;
  onSelect: (site: Site) => void;
};

const statusCopy: Record<Site["status"], { label: string; tone: string }> = {
  stable: { label: "Stable", tone: "bg-emerald-100 text-emerald-700" },
  elevated: { label: "Elevated", tone: "bg-amber-100 text-amber-700" },
  critical: { label: "Critical", tone: "bg-rose-100 text-rose-700" },
};

export function SiteSwitcher({ sites, value, onSelect }: SiteSwitcherProps) {
  const [open, setOpen] = useState(false);

  const summary = useMemo(() => {
    return [
      { icon: MapPin, label: value.location },
      { icon: Waves, label: value.weather },
    ];
  }, [value]);

  return (
    <>
      <Button
        variant="outline"
        size="lg"
        className="group h-auto min-w-64 justify-start rounded-xl border-dashed bg-white/40 px-4 py-3 text-start shadow-sm transition hover:border-muted-foreground/40 hover:bg-white"
        onClick={() => setOpen(true)}
      >
        <div className="flex w-full items-center gap-3">
          <Avatar className="size-14 rounded-xl border bg-gradient-to-br from-emerald-100 via-sky-100 to-lime-100 text-emerald-700">
            <AvatarFallback className="rounded-xl text-xl font-semibold">
              {value.name
                .split(" ")
                .filter(Boolean)
                .slice(0, 2)
                .map((part) => part[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                Active Site
              </span>
              <ChevronDown className="size-4 text-muted-foreground transition group-hover:translate-y-0.5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">
              {value.name}
            </h2>
            <div className="mt-1 flex flex-wrap gap-3 text-sm text-muted-foreground">
              {summary.map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-1">
                  <Icon className="size-4 opacity-70" />
                  {label}
                </span>
              ))}
            </div>
          </div>
          <Badge
            className={`text-xs font-medium capitalize ${statusCopy[value.status].tone}`}
          >
            {statusCopy[value.status].label}
          </Badge>
        </div>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen} title="Switch site">
        <CommandInput placeholder="Search Iowa sites…" />
        <CommandList>
          <CommandGroup heading="Sites">
            {sites.map((site) => (
              <CommandItem
                key={site.id}
                value={site.name}
                onSelect={() => {
                  onSelect(site);
                  setOpen(false);
                }}
                className="flex items-start gap-3 rounded-lg px-3 py-4"
              >
                <div className="rounded-lg bg-emerald-50 p-2">
                  <Building2 className="size-5 text-emerald-600" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">
                      {site.name}
                    </span>
                    <Badge variant="outline" className="capitalize">
                      {statusCopy[site.status].label}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {site.location} • {site.acres.toLocaleString()} acres •{" "}
                    {site.focus}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Last audit {site.lastAudit} · Next {site.nextAudit}
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
