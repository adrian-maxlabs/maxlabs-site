import { createGoogleGenerativeAI } from "@ai-sdk/google";

/** Default model — free-tier friendly on Google AI Studio. */
export const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash";

export function resolveGeminiApiKey(): string | undefined {
  return process.env.GEMINI_API_KEY ?? process.env.GOOGLE_GENERATIVE_AI_API_KEY;
}

export function isGeminiConfigured(): boolean {
  return Boolean(resolveGeminiApiKey());
}

export function getGeminiModel() {
  const apiKey = resolveGeminiApiKey();
  if (!apiKey) return null;

  const modelId = process.env.GEMINI_MODEL ?? DEFAULT_GEMINI_MODEL;
  const google = createGoogleGenerativeAI({ apiKey });
  return google(modelId);
}
