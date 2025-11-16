"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Mic, Paperclip, SendHorizonal, Sparkles } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { ChatMessage, Site } from "@/data/mock-data";

const quickPrompts = [
  "Draft a confined space entry plan for tonight",
  "Summarize open chemical storage issues",
  "Prep a pre-harvest safety briefing for Crew Charlie",
];

type ChatPanelProps = {
  site: Site;
  initialMessages: ChatMessage[];
};

export function ChatPanel({ site, initialMessages }: ChatPanelProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const idRef = useRef(initialMessages.length);

  const nextId = () => {
    idRef.current += 1;
    return idRef.current;
  };

  const canSend = draft.trim().length > 0 && !isThinking;

  const handleSubmit = (value?: string) => {
    const content = (value ?? draft).trim();
    if (!content) return;

    const userMessage: ChatMessage = {
      id: `m-${nextId()}`,
      author: "user",
      content,
      timestamp: "Just now",
    };
    setMessages((prev) => [...prev, userMessage]);
    setDraft("");
    setIsThinking(true);

    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: `ai-${nextId()}`,
        author: "ai",
        timestamp: "Moments ago",
        tags: ["generated", `site:${site.id}`],
        content: [
          `I drafted a response tailored to ${site.name}.`,
          "• Action items queued for review in Planner.",
          "• Notifications staged for on-shift crew leads.",
          "• Documentation saved to your EHS binder.",
          "Confirm before anything is sent.",
        ].join("\n"),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsThinking(false);
    }, 1200);
  };

  const voiceLabel = useMemo(() => {
    return `Hold to capture a voice memo for ${site.name}`;
  }, [site.name]);

  return (
    <Card className="relative flex h-full flex-col overflow-hidden border-none bg-gradient-to-br from-slate-50 via-white to-emerald-50 p-0 shadow-md">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            AI Field Desk
          </p>
          <h3 className="text-xl font-semibold">
            Morning brief for {site.name.split(" ")[0]} site
          </h3>
        </div>
        <Badge variant="outline" className="gap-1">
          <Sparkles className="size-4 text-emerald-500" />
          AI handles this
        </Badge>
      </div>

      <ScrollArea className="flex-1 px-6 py-6">
        <div className="flex flex-col gap-6">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "flex w-full items-start gap-3",
                message.author === "user" ? "flex-row-reverse text-right" : ""
              )}
            >
              <Avatar className="size-10 shrink-0">
                <AvatarFallback className={cn("text-sm font-semibold", {
                  "bg-emerald-600 text-white": message.author === "ai",
                })}>
                  {message.author === "ai" ? "AI" : "ME"}
                </AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  "max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
                  message.author === "ai"
                    ? "bg-white text-foreground"
                    : "bg-emerald-600 text-primary-foreground"
                )}
              >
                <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground/70">
                  <span>{message.timestamp}</span>
                  {message.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-[0.6rem] uppercase">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <p className="whitespace-pre-line">{message.content}</p>
              </div>
            </motion.div>
          ))}
          <AnimatePresence>
            {isThinking && (
              <motion.div
                layout
                key="thinking"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground"
              >
                <Loader2 className="size-4 animate-spin text-emerald-500" />
                AI drafting handoff steps…
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ScrollArea>

      <div className="border-t bg-white/80 px-6 py-4 backdrop-blur">
        <div className="mb-3 flex flex-wrap gap-2">
          {quickPrompts.map((prompt) => (
            <Button
              key={prompt}
              size="sm"
              variant="secondary"
              className="rounded-full"
              onClick={() => handleSubmit(prompt)}
              disabled={isThinking}
            >
              <Sparkles className="mr-1 size-3.5 text-emerald-500" />
              {prompt}
            </Button>
          ))}
        </div>
        <div className="flex items-end gap-3">
          <Textarea
            placeholder={`Ask the EHS assistant about ${site.name}…`}
            className="min-h-[96px] flex-1 resize-none rounded-2xl border border-muted-foreground/10 bg-white/70 px-4 py-3 shadow-inner"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                handleSubmit();
              }
            }}
          />
          <div className="flex flex-col items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-11 rounded-full border-dashed bg-white shadow-sm"
                >
                  <Paperclip className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="rounded-lg bg-foreground text-background">
                Attach field notes, photos, or monitor logs
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-11 rounded-full border-dashed bg-white shadow-sm"
                >
                  <Mic className="size-5 text-emerald-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="rounded-lg bg-foreground text-background">
                {voiceLabel}
              </TooltipContent>
            </Tooltip>
            <Button
              size="icon"
              disabled={!canSend}
              className="size-12 rounded-full bg-emerald-600 text-white shadow-lg transition hover:bg-emerald-700"
              onClick={() => handleSubmit()}
            >
              <SendHorizonal className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-emerald-100/40 via-transparent to-transparent" />
    </Card>
  );
}
