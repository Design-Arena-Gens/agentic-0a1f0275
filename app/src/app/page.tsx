"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  ExternalLink,
  GanttChart,
  Menu,
  Shield,
  Sparkles,
  Sprout,
} from "lucide-react";

import { AuditSchedule } from "@/components/audit-schedule";
import { ChatPanel } from "@/components/chat-panel";
import { ComplianceRoadmap } from "@/components/compliance-roadmap";
import { CrewReadiness } from "@/components/crew-readiness";
import { EquipmentHealth } from "@/components/equipment-health";
import { FieldConditions } from "@/components/field-conditions";
import { IncidentTable } from "@/components/incident-table";
import { MetricCards } from "@/components/metric-cards";
import { SiteSwitcher } from "@/components/site-switcher";
import {
  auditCalendar,
  complianceMilestones,
  crewReadiness,
  equipmentChecks,
  fieldConditions,
  incidentLog,
  quickInsights,
  sampleMessages,
  sites,
} from "@/data/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const [activeSite, setActiveSite] = useState(sites[0]);

  const heroCopy = useMemo(() => {
    return {
      title: "PrairieSafe AI",
      subtitle:
        "Iowa-grown EHS command center—farmers chat, AI drafts the paperwork, everyone stays safe.",
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-slate-50 to-white">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between rounded-3xl border border-muted-foreground/20 bg-white/80 px-5 py-4 shadow-sm backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-200 via-lime-100 to-sky-200 text-emerald-800">
              <Sprout className="size-5" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
                Iowa EHS Console
              </p>
              <h1 className="text-lg font-semibold text-foreground">
                {heroCopy.title}
              </h1>
            </div>
            <Badge className="hidden rounded-full bg-emerald-600 text-xs uppercase tracking-wide text-white sm:inline-flex">
              AI-first
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="gap-2 rounded-full border-dashed border-emerald-200 bg-white"
            >
              <Shield className="size-4 text-emerald-600" />
              Safety Board
            </Button>
            <Button
              className="gap-2 rounded-full bg-emerald-600 px-4 text-sm font-semibold text-white shadow-lg hover:bg-emerald-700"
            >
              <Sparkles className="size-4" />
              Launch AI Plan
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hidden rounded-full border border-muted-foreground/30 bg-white/70 shadow-sm sm:inline-flex"
            >
              <Bell className="size-5 text-emerald-600" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="inline-flex rounded-full border border-muted-foreground/30 bg-white/70 shadow-sm sm:hidden"
            >
              <Menu className="size-5 text-emerald-600" />
            </Button>
          </div>
        </header>

        <Card className="space-y-4 rounded-3xl border border-emerald-200/40 bg-white/95 p-6 shadow-md backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-2">
              <Badge variant="outline" className="rounded-full bg-emerald-100 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                Built for Iowa farms
              </Badge>
              <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
                {heroCopy.subtitle}
              </h2>
              <p className="text-sm text-muted-foreground">
                Manage multiple sites, keep crews ready, and let AI batch the compliance chores while you stay in control.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 rounded-2xl border border-dashed border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                <GanttChart className="size-4" />
                Human-in-the-loop steps
              </span>
              <p>
                AI drafts all checklists, work orders, and messages. Farmers review with one click before anything is sent.
              </p>
              <Button variant="link" className="px-0 text-emerald-700">
                Watch the AI flow
                <ExternalLink className="ml-1 size-4" />
              </Button>
            </div>
          </div>
          <Separator />
          <SiteSwitcher sites={sites} value={activeSite} onSelect={setActiveSite} />
        </Card>

        <MetricCards insights={quickInsights} />

        <div className="grid gap-6 lg:grid-cols-[2fr_1.2fr]">
          <div className="flex flex-col gap-6">
            <ChatPanel site={activeSite} initialMessages={sampleMessages} />
            <ComplianceRoadmap milestones={complianceMilestones} />
          </div>
          <div className="flex flex-col gap-6">
            <FieldConditions items={fieldConditions} />
            <AuditSchedule items={auditCalendar} />
            <CrewReadiness crews={crewReadiness} />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <IncidentTable incidents={incidentLog} />
          <EquipmentHealth assets={equipmentChecks} />
        </div>
      </div>
    </div>
  );
}
