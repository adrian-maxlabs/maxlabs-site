import { z } from "zod";

export type ChatLanguage = "en" | "tl";

export const chatLanguageSchema = z.enum(["en", "tl"]);

export const CHAT_LANGUAGE_STORAGE_KEY = "maxlabs-chat-language";

export const CHAT_LANGUAGE_OPTIONS = [
  { value: "en" as const, label: "English" },
  { value: "tl" as const, label: "Tagalog" },
] as const;

export const CHAT_COPY = {
  en: {
    welcomeTitle: "Welcome",
    welcomeBody:
      "Hi! I'm MAX — I can answer questions about MAXLABS services, our delivery process, values, and how to get started with a consultation.",
    languagePrompt: "Which language would you like to use for this chat?",
    quickQuestions: "Quick questions",
    inputPlaceholder: "Ask about services, process, or consultations…",
    thinking: "MAX is thinking…",
    suggestedQuestions: [
      "What services does MAXLABS offer?",
      "How does your delivery process work?",
      "How can I request a consultation?",
    ],
    errorUnavailable:
      "The assistant is temporarily unavailable. Please email maxlabs.systems@gmail.com or use our contact form.",
    errorGeneric: "Something went wrong. Please try again or contact us directly.",
    footerNote: "AI answers based on MAXLABS public info.",
    requestConsultation: "Request a consultation",
    selectLanguageHint: "Choose a language to start chatting.",
  },
  tl: {
    welcomeTitle: "Maligayang pagdating",
    welcomeBody:
      "Kumusta! Ako si MAX — makakatulong akong sumagot tungkol sa mga serbisyo ng MAXLABS, proseso ng delivery, mga halaga, at kung paano magsimula ng consultation.",
    languagePrompt: "Anong wika ang gusto ninyong gamitin sa chat na ito?",
    quickQuestions: "Mabilis na tanong",
    inputPlaceholder: "Magtanong tungkol sa serbisyo, proseso, o consultation…",
    thinking: "Nag-iisip si MAX…",
    suggestedQuestions: [
      "Ano ang mga serbisyo ng MAXLABS?",
      "Paano gumagana ang inyong delivery process?",
      "Paano ako makakahingi ng consultation?",
    ],
    errorUnavailable:
      "Pansamantalang hindi available ang assistant. Mag-email sa maxlabs.systems@gmail.com o gamitin ang contact form.",
    errorGeneric: "May naganap na error. Subukan ulit o makipag-ugnayan sa amin.",
    footerNote: "Batay ang mga sagot sa pampublikong impormasyon ng MAXLABS.",
    requestConsultation: "Humiling ng consultation",
    selectLanguageHint: "Pumili ng wika para magsimulang mag-chat.",
  },
} as const;

export function getStoredChatLanguage(): ChatLanguage | null {
  if (typeof window === "undefined") return null;

  const stored = window.localStorage.getItem(CHAT_LANGUAGE_STORAGE_KEY);
  if (stored === "en" || stored === "tl") return stored;
  return null;
}

export function storeChatLanguage(language: ChatLanguage): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CHAT_LANGUAGE_STORAGE_KEY, language);
}

export function getLanguageLabel(language: ChatLanguage): string {
  return CHAT_LANGUAGE_OPTIONS.find((option) => option.value === language)?.label ?? language;
}
