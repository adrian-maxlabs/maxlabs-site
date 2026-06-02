"use client";

import dynamic from "next/dynamic";

export const ChatWidgetLazy = dynamic(
  () => import("@/features/chatbot/components/ChatWidget").then((mod) => mod.ChatWidget),
  { ssr: false },
);
