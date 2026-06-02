import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { z } from "zod";
import { chatLanguageSchema } from "@/features/chatbot/lib/chat-language";
import { buildChatSystemPrompt } from "@/features/chatbot/lib/build-system-prompt";
import { getGeminiModel, isGeminiConfigured } from "@/features/chatbot/lib/google-model";

export const maxDuration = 30;

const requestSchema = z.object({
  messages: z.array(z.custom<UIMessage>()).min(1).max(40),
  language: chatLanguageSchema.default("en"),
});

export async function POST(req: Request) {
  if (!isGeminiConfigured()) {
    return Response.json(
      {
        error:
          "The MAXLABS assistant is not configured yet. Please contact us at maxlabs.systems@gmail.com.",
      },
      { status: 503 },
    );
  }

  const model = getGeminiModel();
  if (!model) {
    return Response.json(
      {
        error:
          "The MAXLABS assistant is not configured yet. Please contact us at maxlabs.systems@gmail.com.",
      },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Invalid chat messages." }, { status: 400 });
  }

  const result = streamText({
    model,
    system: buildChatSystemPrompt(parsed.data.language),
    messages: await convertToModelMessages(parsed.data.messages),
    maxOutputTokens: 600,
  });

  return result.toUIMessageStreamResponse();
}
