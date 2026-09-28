import { GoogleGenAI } from "@google/genai";
import { capabilities, contactInfo } from "@/data/content";

// Public marketing/support chatbot, powered by the Google Gemini free tier.
// The API key lives only on the server (env var) and is never exposed to the
// browser — the client talks to this route, this route talks to Gemini, and
// the reply is streamed back as plain text.

// Gemini Flash models are covered by the free tier. Override with GEMINI_MODEL
// (e.g. gemini-3.5-flash) without touching code.
const MODEL = process.env.GEMINI_MODEL || "gemini-3.6-flash";

const MAX_MESSAGES = 20; // most recent turns we accept from the browser
const MAX_CHARS = 4000; // per-message guard against abuse

type Role = "user" | "assistant";
interface ChatMessage {
  role: Role;
  content: string;
}

function buildSystemPrompt(): string {
  const capabilityList = capabilities.map((c) => `- ${c.title}`).join("\n");
  return `You are "Avi", the assistant on the Avenza Consulting Services website. You help visitors understand what Avenza does and point them to the right page or contact.

ABOUT AVENZA
Avenza Consulting Services is a banking-technology transformation partner that helps banks modernise their core and payment platforms. Avenza specialises in the Temenos ecosystem (Transact / T24, Payments, FCM, and Infinity digital banking) and delivers transformation programmes end to end — using proven methodologies, accelerators and global delivery.

CAPABILITY AREAS
${capabilityList}

USEFUL LINKS (use these exact relative paths when pointing people somewhere)
- Capabilities overview: /capabilities (each area also has its own page, e.g. /capabilities/core-banking, /capabilities/temenos-transact)
- About & leadership: /about
- Industry expertise: /about/industry-expertise
- Insights / articles: /insights
- Careers: /careers
- Life at Avenza: /life-at-avenza
- Contact: /contact  (email: ${contactInfo.email})

HOW TO RESPOND
- Be concise, warm and professional — short paragraphs or tight bullet points. Aim for under ~120 words unless asked for detail.
- Only answer questions about Avenza, its services, and banking-technology transformation. If asked about anything unrelated, politely steer back.
- Never invent specifics you don't know — pricing, timelines, client names, team size or commitments. If it needs a person or you're unsure, point them to /contact or ${contactInfo.email}.
- When relevant, link to the most useful page above using its relative path (e.g. "see /capabilities/temenos-payments").
- You provide information only — never claim to book meetings, send email, or change anything on someone's behalf.
- Plain text only — do not use Markdown formatting (no **bold**, headings or backticks).`;
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set — chat is unavailable.");
    return Response.json({ error: "Chat is not configured on the server." }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  const rawMessages = body && Array.isArray(body.messages) ? body.messages : null;
  if (!rawMessages) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Sanitise and clamp whatever the browser sent.
  const messages: ChatMessage[] = rawMessages
    .filter(
      (m: unknown): m is ChatMessage =>
        !!m &&
        typeof m === "object" &&
        ((m as ChatMessage).role === "user" || (m as ChatMessage).role === "assistant") &&
        typeof (m as ChatMessage).content === "string" &&
        (m as ChatMessage).content.trim().length > 0
    )
    .slice(-MAX_MESSAGES)
    .map((m: ChatMessage) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Gemini uses "model" for the assistant role; "user" stays as-is.
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const ai = new GoogleGenAI({ apiKey });
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const result = await ai.models.generateContentStream({
          model: MODEL,
          contents,
          config: {
            systemInstruction: buildSystemPrompt(),
            maxOutputTokens: 1024,
            temperature: 0.6,
          },
        });
        for await (const chunk of result) {
          const text = chunk.text;
          if (text) controller.enqueue(encoder.encode(text));
        }
      } catch (err) {
        console.error("Chat stream error:", err);
        try {
          controller.enqueue(
            encoder.encode(`\n\nSorry — something went wrong on our end. Please try again, or reach us at ${contactInfo.email}.`)
          );
        } catch {
          // stream already closed; nothing more to do
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}
