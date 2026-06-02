"use client";

import Link from "next/link";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

const markdownComponents: Components = {
  p: ({ children }) => (
    <p className="mb-2 last:mb-0 [&:not(:first-child)]:mt-2">{children}</p>
  ),
  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  h1: ({ children }) => (
    <p className="mb-1.5 mt-2 text-sm font-semibold first:mt-0">{children}</p>
  ),
  h2: ({ children }) => (
    <p className="mb-1.5 mt-2 text-sm font-semibold first:mt-0">{children}</p>
  ),
  h3: ({ children }) => (
    <p className="mb-1 mt-2 text-sm font-semibold first:mt-0">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="my-2 list-disc space-y-1 pl-4 marker:text-[var(--primary)]">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-2 list-decimal space-y-1 pl-4 marker:text-[var(--muted)]">{children}</ol>
  ),
  li: ({ children }) => <li className="pl-0.5 leading-relaxed">{children}</li>,
  a: ({ href, children }) => {
    if (!href) return <span>{children}</span>;

    const isInternal = href.startsWith("/") && !href.startsWith("//");

    if (isInternal) {
      return (
        <Link
          href={href}
          className="font-medium text-[var(--primary)] underline underline-offset-2 hover:text-[var(--primary-hover)]"
        >
          {children}
        </Link>
      );
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-[var(--primary)] underline underline-offset-2 hover:text-[var(--primary-hover)]"
      >
        {children}
      </a>
    );
  },
  code: ({ className, children }) => {
    const isBlock = className?.includes("language-");

    if (isBlock) {
      return (
        <code className="block overflow-x-auto rounded-md bg-[var(--background)] px-2 py-1.5 font-mono text-xs">
          {children}
        </code>
      );
    }

    return (
      <code className="rounded bg-[var(--background)] px-1 py-0.5 font-mono text-[0.8125rem]">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="my-2 overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--background)] p-2 text-xs">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-2 border-l-2 border-[var(--primary)]/40 pl-3 text-[var(--muted-foreground)]">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-3 border-[var(--border)]" />,
};

type ChatMessageMarkdownProps = {
  content: string;
  className?: string;
};

export function ChatMessageMarkdown({ content, className }: ChatMessageMarkdownProps) {
  return (
    <div className={cn("chat-markdown min-w-0 break-words text-sm leading-relaxed", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
