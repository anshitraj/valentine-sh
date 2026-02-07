import { NextRequest, NextResponse } from "next/server";

const getGeminiUrl = () =>
  `https://generativelanguage.googleapis.com/v1beta/models/${process.env.GEMINI_MODEL || "gemini-1.5-flash"}:generateContent`;

const MIN_SENTENCES = 7;

const sentenceCount = (text: string) => {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (!normalized) return 0;
  return normalized.split(/(?<=[.!?])\s+/).filter(Boolean).length;
};

const padToMinSentences = (text: string) => {
  let result = text.trim();
  if (!result) return result;

  const padding = [
    "I hope this message adds a soft smile to your day.",
    "You deserve kind, easy moments.",
    "Thanks for sharing your wish.",
    "Keep that gentle energy; it suits you.",
    "Wishing you a calm, cozy vibe today.",
  ];

  let idx = 0;
  while (sentenceCount(result) < MIN_SENTENCES && idx < padding.length) {
    result = `${result} ${padding[idx]}`;
    idx += 1;
  }

  return result;
};

const TONE_RULE =
  "Write like a warm friend texting -- cute, playful, human-readable words. Do NOT sound robotic, formal, or like AI. Do not use names unless the user provided one.";

const GROUNDING_RULE =
  "Stay grounded: only respond to the user's wish. Do not invent personal facts. Do not claim to have met, messaged, or sent gifts. Do not mention being strangers or real-world actions.";

const SYSTEM_PROMPT = `You are responding to a birthday wish.
IMPORTANT: Write 7-8 full sentences in one paragraph. Expand with compliments and warmth.
${TONE_RULE}
${GROUNDING_RULE}
Keep it light, playful, and encouraging.
Do not make promises.
Do not mention love.
Do not mention future commitments.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const wish = typeof body?.wish === "string" ? body.wish.trim() : "";
    if (!wish) {
      return NextResponse.json({ error: "Wish is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API not configured" }, { status: 503 });
    }

    const userPrompt = `Birthday wish: ${wish}`;
    const makeRequest = async (prompt: string) => {
      const res = await fetch(`${getGeminiUrl()}?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          generationConfig: {
            maxOutputTokens: 512,
            temperature: 0.7,
          },
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error("Gemini API error:", res.status, err);
        return null;
      }

      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      return typeof text === "string" && text.length > 0 ? text : null;
    };

    let text = (await makeRequest(userPrompt)) || "Even without AI, that's a pretty good wish.";
    if (sentenceCount(text) < MIN_SENTENCES) {
      const expanded = await makeRequest(
        `${userPrompt}\n\nPlease expand to 7-8 full sentences in one paragraph. Keep the same tone and constraints.`,
      );
      if (expanded) {
        text = expanded;
      }
    }

    text = padToMinSentences(text);

    return NextResponse.json({ message: text });
  } catch (e) {
    console.error("Wish API error:", e);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
