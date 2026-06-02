import { ChatWidgetLazy } from "@/features/chatbot/components/ChatWidgetLazy";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ChatWidgetLazy />
    </>
  );
}
