import { NextRequest, NextResponse } from "next/server";

const getGeminiUrl = () =>
  `https://generativelanguage.googleapis.com/v1beta/models/${process.env.GEMINI_MODEL || "gemini-1.5-flash"}:generateContent`;

const MIN_SENTENCES = 7;
const FALLBACK = "Something sweet is in the air.";

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
    "Thanks for sharing your answer.",
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

const LENGTH_RULE =
  "IMPORTANT: Write 7-8 full sentences in one paragraph. Do NOT reply with just 1-2 short lines. Expand with compliments, warmth, and a bit of playfulness.";

const TONE_RULE =
  "Write like a warm friend texting -- cute, playful, human-readable words. Do NOT sound robotic, formal, or like AI. Do not use names unless the user provided one.";

const GROUNDING_RULE =
  "Stay grounded: only respond to the user's choice. Do not invent personal facts. Do not claim to have met, messaged, or sent gifts. Do not mention being strangers or real-world actions.";

const PROMPTS: Record<string, { system: string; userPrefix: string }> = {
  horoscope: {
    system: `You are generating a fun, cute horoscope.
Keep it light, playful, and encouraging. Do not be serious or predictive.
Include a fun line: "There might be someone in your life whose name starts with the letter A, and they could be special."
${LENGTH_RULE}
${TONE_RULE}
${GROUNDING_RULE}
Cute, sweet, slightly mysterious.`,
    userPrefix: "Zodiac sign: ",
  },
  rose: {
    system: `You are responding to someone who chose Roses or Chocolates.
Be sweet and complimentary -- e.g. if Roses, say something like "you're as pretty as roses" or how their choice says something nice about them. Playful, flirty but light, encouraging. No promises, no heavy romance.
${LENGTH_RULE}
${TONE_RULE}
${GROUNDING_RULE}`,
    userPrefix: "They chose: ",
  },
  chocolate: {
    system: `You are responding to someone's "sweet tooth level" (Very sweet / Balanced / Depends on mood).
Be sweet and complimentary. Playful, encouraging. No promises.
${LENGTH_RULE}
${TONE_RULE}
${GROUNDING_RULE}`,
    userPrefix: "Sweet tooth: ",
  },
  teddy: {
    system: `Someone just tapped a virtual teddy to give it a hug.
Be sweet -- e.g. say something like how they give good hugs or how the teddy is lucky. Warm, playful, light. No promises.
${LENGTH_RULE}
${TONE_RULE}
${GROUNDING_RULE}`,
    userPrefix: "Teddy hug tap",
  },
  hug: {
    system: `Someone said what kind of hug they like (Warm / Quick / Long).
Be sweet and complimentary about their choice -- e.g. if they said Warm, say something like how they deserve all the warm hugs or how that says something nice about them. Playful, encouraging. No promises.
${LENGTH_RULE}
${TONE_RULE}
${GROUNDING_RULE}`,
    userPrefix: "Hug type: ",
  },
  mood: {
    system: `Someone shared their energy level today (High / Medium / Low).
Be supportive and sweet. Encouraging, light. No promises.
${LENGTH_RULE}
${TONE_RULE}
${GROUNDING_RULE}`,
    userPrefix: "Energy: ",
  },
  valentine: {
    system: `Someone said what they enjoy more: Talking, Listening, or Both.
Be sweet and complimentary. No pressure, no romance push. Cute, light, encouraging. No promises or future commitment language.
${LENGTH_RULE}
${TONE_RULE}
${GROUNDING_RULE}`,
    userPrefix: "They said: ",
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const type = typeof body?.type === "string" ? body.type.trim().toLowerCase() : "";
    const input = typeof body?.input === "string" ? body.input.trim() : "";

    if (!type || !Object.prototype.hasOwnProperty.call(PROMPTS, type)) {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }
    if (!input && type !== "teddy") {
      return NextResponse.json({ error: "Input required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API not configured" }, { status: 503 });
    }

    const { system, userPrefix } = PROMPTS[type];
    const userText = type === "teddy" ? "They tapped the teddy for a hug." : `${userPrefix}${input}`;

    const makeRequest = async (prompt: string) => {
      const res = await fetch(`${getGeminiUrl()}?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          systemInstruction: { parts: [{ text: system }] },
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

    let text = (await makeRequest(userText)) || FALLBACK;
    if (sentenceCount(text) < MIN_SENTENCES) {
      const expanded = await makeRequest(
        `${userText}\n\nPlease expand to 7-8 full sentences in one paragraph. Keep the same tone and constraints.`,
      );
      if (expanded) {
        text = expanded;
      }
    }

    text = padToMinSentences(text);

    return NextResponse.json({ message: text });
  } catch (e) {
    console.error("Fun API error:", e);
    return NextResponse.json({ message: FALLBACK });
  }
}
