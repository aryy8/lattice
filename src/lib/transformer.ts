export interface TransformationOptions {
  tone: "natural" | "academic" | "conversational" | "professional" | "casual";
  intensity: "subtle" | "balanced" | "expressive";
  preserveFormatting: boolean;
}

export interface TransformationStep {
  fromCode: string;
  fromName: string;
  toCode: string;
  toName: string;
  hopIndex: number;
}

// Cliches and patterns typically flagged by AI detectors
const AI_REPLACEMENTS: Array<{ regex: RegExp; replace: (match: string) => string; tone?: string }> = [
  { regex: /\bin today's (?:fast-paced )?(?:digital |modern )?landscape\b/gi, replace: () => "today" },
  { regex: /\bdelve into\b/gi, replace: () => "explore" },
  { regex: /\bintricate tapestry\b/gi, replace: () => "complex web" },
  { regex: /\btapestry of\b/gi, replace: () => "blend of" },
  { regex: /\bmultifaceted\b/gi, replace: () => "varied" },
  { regex: /\bseamlessly\b/gi, replace: () => "smoothly" },
  { regex: /\btestament to\b/gi, replace: () => "proof of" },
  { regex: /\bit is important to note that\b/gi, replace: () => "notably," },
  { regex: /\bit is worth noting that\b/gi, replace: () => "also," },
  { regex: /\bit should be noted that\b/gi, replace: () => "keep in mind that" },
  { regex: /\bfurthermore\b/gi, replace: () => "also" },
  { regex: /\bmoreover\b/gi, replace: () => "plus" },
  { regex: /\butilization of\b/gi, replace: () => "use of" },
  { regex: /\butilize\b/gi, replace: () => "use" },
  { regex: /\butilizes\b/gi, replace: () => "uses" },
  { regex: /\butilizing\b/gi, replace: () => "using" },
  { regex: /\bfacilitates the optimization of\b/gi, replace: () => "improves" },
  { regex: /\bfacilitate\b/gi, replace: () => "help" },
  { regex: /\bfacilitates\b/gi, replace: () => "helps" },
  { regex: /\boperational efficacy\b/gi, replace: () => "day-to-day performance" },
  { regex: /\bindispensable\b/gi, replace: () => "essential" },
  { regex: /\bparamount importance\b/gi, replace: () => "critical priority" },
  { regex: /\bconduct a comprehensive evaluation of\b/gi, replace: () => "thoroughly evaluate" },
  { regex: /\bprospective outcomes\b/gi, replace: () => "potential results" },
  { regex: /\bprior to initiating implementation\b/gi, replace: () => "before starting" },
  { regex: /\bsynergize our schedules\b/gi, replace: () => "find a time that works" },
  { regex: /\bat your earliest convenience\b/gi, replace: () => "when you have a moment" },
  { regex: /\bdeliverables outlined in\b/gi, replace: () => "items in" },
  { regex: /\bstrategic alignment documentation\b/gi, replace: () => "planning notes" },
  { regex: /\bunlock key strategies\b/gi, replace: () => "find better ways" },
  { regex: /\bnavigating the complexities of\b/gi, replace: () => "handling" },
  { regex: /\bin conclusion,\b/gi, replace: () => "to wrap up," },
  { regex: /\ball in all,\b/gi, replace: () => "overall," },
  { regex: /\brich array of\b/gi, replace: () => "wide range of" },
];

export async function humaniseText(
  text: string,
  pathCodes: string[],
  options: TransformationOptions,
  onStepProgress?: (step: number, total: number, currentLang: string) => void
): Promise<string> {
  if (!text || !text.trim()) return "";

  const totalHops = Math.max(1, pathCodes.length - 1);

  // Simulate hop-by-hop latency and visual feedback
  for (let i = 0; i < totalHops; i++) {
    const currentCode = pathCodes[i + 1] || pathCodes[i];
    if (onStepProgress) {
      onStepProgress(i + 1, totalHops, currentCode);
    }
    // Small realistic delay between 200ms and 350ms per hop
    await new Promise((resolve) => setTimeout(resolve, 260));
  }

  let transformed = text;

  // Step 1: Remove robotic clichés
  for (const item of AI_REPLACEMENTS) {
    transformed = transformed.replace(item.regex, item.replace);
  }

  // Step 2: Tone adjustments
  if (options.tone === "conversational" || options.tone === "casual") {
    transformed = transformed
      .replace(/\bdo not\b/gi, "don't")
      .replace(/\bcannot\b/gi, "can't")
      .replace(/\bwill not\b/gi, "won't")
      .replace(/\bit is\b/gi, "it's")
      .replace(/\bthere is\b/gi, "there's")
      .replace(/\bwe are\b/gi, "we're")
      .replace(/\bthey are\b/gi, "they're")
      .replace(/\bI am\b/gi, "I'm");
  } else if (options.tone === "academic") {
    transformed = transformed
      .replace(/\bdon't\b/gi, "do not")
      .replace(/\bcan't\b/gi, "cannot")
      .replace(/\bwon't\b/gi, "will not")
      .replace(/\bit's\b/gi, "it is")
      .replace(/\bI'm\b/gi, "I am");
  }

  // Step 3: Intensity & structural variation through language path logic
  const paragraphs = options.preserveFormatting ? transformed.split(/\n\s*\n/) : [transformed];
  
  const processedParagraphs = paragraphs.map((para) => {
    const matched = para.match(/[^.!?]+[.!?]+|\s*[^.!?]+$/g);
    const rawSentences: string[] = matched ? Array.from(matched) : [para];
    
    // Vary cadence: combine or re-rhythm
    const processedSentences = rawSentences.map((sentence, idx) => {
      let s = sentence.trim();
      if (!s) return "";

      // Add human-like transitional variety on certain sentences if intensity >= balanced
      if (options.intensity !== "subtle" && idx === 1 && !/^(However|Also|In practice|That said|Naturally)/i.test(s)) {
        if (options.tone === "conversational") {
          s = s.replace(/^([a-z])/i, (m) => `In practice, ${m.toLowerCase()}`);
        } else if (options.tone === "academic") {
          s = s.replace(/^([a-z])/i, (m) => `Empirically, ${m.toLowerCase()}`);
        }
      }

      // Smooth capitalizations
      if (s.length > 0) {
        s = s.charAt(0).toUpperCase() + s.slice(1);
      }
      return s;
    });

    return processedSentences.filter(Boolean).join(" ");
  });

  let result = processedParagraphs.join("\n\n").trim();

  // If text was unmodified (no clichés matched), give it a subtle natural polish
  if (result === text.trim() && text.length > 15) {
    result = text
      .replace(/(\b(?:really|very|quite)\s+)/gi, "")
      .replace(/\bIn order to\b/gi, "To")
      .replace(/\bdue to the fact that\b/gi, "because")
      .replace(/\bat this point in time\b/gi, "currently")
      .trim();
  }

  return result;
}
