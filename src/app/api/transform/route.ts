import { NextRequest } from "next/server";

const DELAY_MS = 300;
const MYMEMORY_API = "https://api.mymemory.translated.net/get";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Translate text using the MyMemory free API.
 * No API key or billing account required.
 * Free tier: 5,000 chars/day (anonymous). Supports all major language codes.
 */
async function translateOnce(text: string, from: string, to: string): Promise<string> {
  const url = new URL(MYMEMORY_API);
  url.searchParams.set("q", text);
  url.searchParams.set("langpair", `${from}|${to}`);

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(`MyMemory API returned HTTP ${res.status}`);
  }

  const data = (await res.json()) as {
    responseData: { translatedText: string };
    responseStatus: number;
    quotaFinished: boolean;
  };

  if (data.quotaFinished) {
    throw new Error("MyMemory daily quota exceeded");
  }

  if (data.responseStatus !== 200) {
    throw new Error(`MyMemory error status: ${data.responseStatus}`);
  }

  const translated = data.responseData?.translatedText;
  if (!translated) {
    throw new Error("Empty translation response from MyMemory");
  }

  return translated;
}

async function translateWithRetry(text: string, from: string, to: string): Promise<string> {
  try {
    return await translateOnce(text, from, to);
  } catch {
    // Retry once after a short back-off
    await sleep(500);
    return await translateOnce(text, from, to);
  }
}

export async function POST(request: NextRequest) {
  let body: { text?: unknown; hops?: unknown };

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { text, hops } = body;

  // Validate text
  if (!text || typeof text !== "string" || !text.trim()) {
    return Response.json(
      { error: "text is required and must be a non-empty string" },
      { status: 400 }
    );
  }

  if (text.length > 5000) {
    return Response.json(
      { error: "text must not exceed 5000 characters" },
      { status: 400 }
    );
  }

  // Validate hops
  if (!Array.isArray(hops) || hops.length < 2) {
    return Response.json(
      { error: "hops must be an array of at least 2 language codes" },
      { status: 400 }
    );
  }

  let current = text.trim();

  try {
    for (let i = 0; i < hops.length - 1; i++) {
      const from = hops[i] as string;
      const to = hops[i + 1] as string;

      current = await translateWithRetry(current, from, to);

      // Throttle between hops to avoid rate limiting (skip after the final hop)
      if (i < hops.length - 2) {
        await sleep(DELAY_MS);
      }
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown translation error";
    return Response.json(
      { error: `Translation failed: ${message}` },
      { status: 500 }
    );
  }

  return Response.json({ result: current });
}
