import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");

// Expect incoming body: { messages: [{ role: 'system'|'user'|'assistant', content: '...' }, ...] }
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = Array.isArray(body?.messages) ? body.messages : [];

    // Transform to Gemini 'contents' shape
    // Gemini expects roles to be either 'user' or 'model'.
    // Map incoming 'assistant' -> 'model', and everything else -> 'user'.
    const contents = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const model = ai.getGenerativeModel({ model: "gemini-flash-latest" });
    const response = await model.generateContent({
      contents,
      // Optional parameters
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      }
    });

    const result = await response.response;
    const reply = result.text() ?? "";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[/api/chat] Gemini error:", err);
    return new Response(JSON.stringify({ error: "Gemini error" }), { status: 500 });
  }
}