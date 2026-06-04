"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ArrowUp, Loader2, X } from "lucide-react";
import { MaxMascot } from "@/components/brand/MaxMascot";
import { ChatMessageMarkdown } from "@/features/chatbot/components/ChatMessageMarkdown";
import {
  CHAT_COPY,
  CHAT_LANGUAGE_OPTIONS,
  type ChatLanguage,
  getStoredChatLanguage,
  storeChatLanguage,
} from "@/features/chatbot/lib/chat-language";
import { cn } from "@/lib/utils";

function getMessageText(parts: { type: string; text?: string }[]): string {
  return parts
    .filter((part) => part.type === "text" && part.text)
    .map((part) => part.text)
    .join("");
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState<ChatLanguage | null>(null);
  const languageRef = useRef<ChatLanguage>("en");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        body: () => ({ language: languageRef.current }),
      }),
    [],
  );

  const { messages, sendMessage, status, error, stop } = useChat({ transport });

  const isBusy = status === "submitted" || status === "streaming";
  const copy = language ? CHAT_COPY[language] : null;
  const canChat = language !== null;

  useEffect(() => {
    const stored = getStoredChatLanguage();
    if (stored) {
      languageRef.current = stored;
      setLanguage(stored);
    }
  }, []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (open && canChat) {
      scrollToBottom();
      const timer = window.setTimeout(() => inputRef.current?.focus(), 150);
      return () => window.clearTimeout(timer);
    }
  }, [open, messages, scrollToBottom, canChat]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function handleSelectLanguage(next: ChatLanguage) {
    languageRef.current = next;
    storeChatLanguage(next);
    setLanguage(next);
  }

  function handleSend(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isBusy || !canChat) return;

    sendMessage({ text: trimmed });
    setInput("");
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    handleSend(input);
  }

  function handleSuggestedQuestion(question: string) {
    handleSend(question);
  }

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close chat overlay"
          className="fixed inset-0 z-[58] bg-black/20 backdrop-blur-[1px] sm:bg-transparent sm:backdrop-blur-none"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={cn(
          "pointer-events-none fixed z-[60] box-border flex max-w-full flex-col gap-3",
          "bottom-[max(1rem,env(safe-area-inset-bottom))] sm:bottom-6",
          // Mobile: stay inside the same horizontal gutters as page content (px-4)
          "left-[max(1rem,env(safe-area-inset-left))] right-[max(1rem,env(safe-area-inset-right))]",
          open ? "items-stretch" : "items-end",
          "sm:left-auto sm:w-auto sm:max-w-none sm:right-6 sm:items-end",
        )}
      >
        <div
          id="maxlabs-chat-panel"
          role="dialog"
          aria-label="MAX — MAXLABS assistant"
          aria-hidden={!open}
          className={cn(
            "flex w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl shadow-slate-950/20 sm:w-96",
            "origin-bottom-right transition-all duration-300 ease-out",
            open
              ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
              : "pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0",
          )}
          style={
            open
              ? { maxHeight: "min(32rem, calc(100dvh - max(7rem, env(safe-area-inset-bottom) + 5.5rem)))" }
              : undefined
          }
        >
          <header className="flex items-center justify-between gap-3 border-b border-[var(--border)] bg-[var(--card)] px-4 py-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--background)] shadow-sm">
                <MaxMascot size={30} />
              </div>
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-semibold text-[var(--foreground)]">
                  MAX
                </p>
                <p className="text-[11px] text-[var(--muted)]">MAXLABS AI Chatbot</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex size-8 items-center justify-center rounded-lg text-[var(--muted)] transition-colors hover:bg-[var(--accent-subtle)] hover:text-[var(--foreground)]"
              aria-label="Close chat"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </header>

          <div className="flex min-h-0 flex-1 flex-col">
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-3">
                <div className="mb-2 flex items-center gap-2">
                  <MaxMascot size={22} />
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--primary)]">
                    {copy?.welcomeTitle ?? "Welcome / Maligayang pagdating"}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-[var(--foreground)]/90">
                  {copy ? (
                    copy.welcomeBody
                  ) : (
                    <>
                      Hi! I&apos;m{" "}
                      <span className="font-semibold text-[var(--primary)]">MAX</span> — I can help
                      with MAXLABS services, delivery process, and consultations. / Kumusta! Ako si{" "}
                      <span className="font-semibold text-[var(--primary)]">MAX</span> — makakatulong
                      ako tungkol sa serbisyo, proseso, at consultation ng MAXLABS.
                    </>
                  )}
                </p>
              </div>

              {!canChat && (
                <div className="rounded-xl border border-[var(--primary)]/25 bg-[var(--accent-subtle)] px-3 py-3">
                  <p className="mb-1 text-sm font-medium text-[var(--foreground)]">
                    Choose your language
                  </p>
                  <p className="mb-3 text-xs text-[var(--muted)]">
                    Piliin ang wikang gusto ninyo para sa chat na ito.
                  </p>
                  <div
                    className="flex flex-wrap gap-2"
                    role="group"
                    aria-label="Choose chat language"
                  >
                    {CHAT_LANGUAGE_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleSelectLanguage(option.value)}
                        className="rounded-full border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:bg-[var(--card)]"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message) => {
                const text = getMessageText(message.parts);
                if (!text) return null;

                const isUser = message.role === "user";

                return (
                  <div
                    key={message.id}
                    className={cn("flex gap-2", isUser ? "justify-end" : "justify-start")}
                  >
                    {!isUser && (
                      <div className="mt-1 shrink-0">
                        <MaxMascot size={20} />
                      </div>
                    )}
                    <div
                      className={cn(
                        "min-w-0 max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                        isUser
                          ? "rounded-br-md bg-[var(--primary)] text-white"
                          : "rounded-bl-md border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]",
                      )}
                    >
                      {isUser ? (
                        <p className="whitespace-pre-wrap break-words">{text}</p>
                      ) : (
                        <ChatMessageMarkdown content={text} />
                      )}
                    </div>
                  </div>
                );
              })}

              {isBusy && (
                <div className="flex justify-start gap-2">
                  <div className="mt-1 shrink-0">
                    <MaxMascot size={20} />
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-2xl rounded-bl-md border border-[var(--border)] bg-[var(--card)] px-3.5 py-2.5 text-sm text-[var(--muted)]">
                    <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
                    {copy?.thinking ?? "MAX is thinking…"}
                  </div>
                </div>
              )}

              {error && (
                <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
                  {error.message.includes("503") || error.message.includes("not configured")
                    ? (copy?.errorUnavailable ??
                      "The assistant is temporarily unavailable. Please email maxlabs.systems@gmail.com or use our contact form.")
                    : (copy?.errorGeneric ??
                      "Something went wrong. Please try again or contact us directly.")}
                </p>
              )}

              {canChat && messages.length === 0 && !isBusy && (
                <div className="space-y-2 pt-1">
                  <p className="text-[11px] font-medium uppercase tracking-wide text-[var(--muted)]">
                    {copy?.quickQuestions}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {copy?.suggestedQuestions.map((question) => (
                      <button
                        key={question}
                        type="button"
                        onClick={() => handleSuggestedQuestion(question)}
                        className="rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-1.5 text-left text-xs text-[var(--foreground)]/85 transition-colors hover:border-[var(--primary)]/40 hover:bg-[var(--accent-subtle)]"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-[var(--border)] bg-[var(--card)] px-2.5 py-2.5 sm:px-3 sm:py-3">
              <form onSubmit={handleSubmit} className="flex min-w-0 items-end gap-1.5 sm:gap-2">
                <label htmlFor="maxlabs-chat-input" className="sr-only">
                  {copy?.inputPlaceholder ?? "Choose a language to start chatting."}
                </label>
                <div className="relative min-w-0 flex-1">
                  {!input && canChat && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-3 inset-y-2 z-[2] block text-[10px] leading-snug text-[var(--muted)] sm:text-[11px]"
                    >
                      {copy?.inputPlaceholder}
                    </span>
                  )}
                  {!canChat && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-3 inset-y-2 z-[2] block text-[10px] leading-snug text-[var(--muted)] sm:text-[11px]"
                    >
                      {CHAT_COPY.en.selectLanguageHint} / {CHAT_COPY.tl.selectLanguageHint}
                    </span>
                  )}
                  <textarea
                    id="maxlabs-chat-input"
                    ref={inputRef}
                    rows={1}
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        handleSend(input);
                      }
                    }}
                    placeholder=" "
                    disabled={isBusy || !canChat}
                    className="relative z-[1] max-h-24 min-h-[3.25rem] w-full min-w-0 resize-none rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] caret-[var(--foreground)] outline-none transition-colors focus:border-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-60 sm:min-h-[2.5rem]"
                  />
                </div>
                {isBusy ? (
                  <button
                    type="button"
                    onClick={() => stop()}
                    className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--muted)] transition-colors hover:bg-[var(--accent-subtle)] sm:size-10"
                    aria-label="Stop response"
                  >
                    <X className="size-4" aria-hidden="true" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!input.trim() || !canChat}
                    className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)] text-white transition-colors hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-50 sm:size-10"
                    aria-label="Send message"
                  >
                    <ArrowUp className="size-4" aria-hidden="true" />
                  </button>
                )}
              </form>

              <p className="mt-2 text-center text-[10px] leading-snug text-[var(--muted)]">
                {copy?.footerNote ?? "AI answers based on MAXLABS public info."}{" "}
                <Link href="/contact" className="font-medium text-[var(--primary)] hover:underline">
                  {copy?.requestConsultation ?? "Request a consultation"}
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="pointer-events-auto relative shrink-0 self-end">
          {!open && (
            <span
              className="pointer-events-none absolute -right-0.5 -top-0.5 z-10 size-3.5 rounded-full bg-sky-400 shadow-sm ring-2 ring-[var(--background)]"
              aria-hidden="true"
            />
          )}
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-controls="maxlabs-chat-panel"
            aria-label={open ? "Close MAX" : "Chat with MAX"}
            className={cn(
              "group relative inline-flex size-14 items-center justify-center rounded-full shadow-lg transition-all duration-300",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]",
              open
                ? "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] hover:shadow-xl"
                : "border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/35 hover:shadow-xl",
            )}
          >
            <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full" aria-hidden="true">
              <span
                className={cn(
                  "absolute inset-1 rounded-full blur-md transition-opacity",
                  open
                    ? "bg-[var(--primary)] opacity-40 group-hover:opacity-60"
                    : "bg-sky-400/25 opacity-70 group-hover:opacity-90",
                )}
              />
            </span>
            <span className="relative flex items-center justify-center">
              {open ? (
                <X className="size-6" aria-hidden="true" />
              ) : (
                <MaxMascot size={34} glow />
              )}
            </span>
            {!open && <span className="sr-only">MAX is available</span>}
          </button>
        </div>
      </div>
    </>
  );
}
