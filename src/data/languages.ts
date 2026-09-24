export interface Language {
  code: string;
  name: string;
  flag: string;
  family?: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: "en", name: "English", flag: "US" },
  { code: "es", name: "Spanish", flag: "ES" },
  { code: "de", name: "German", flag: "DE" },
  { code: "ja", name: "Japanese", flag: "JP" },
  { code: "fr", name: "French", flag: "FR" },
  { code: "it", name: "Italian", flag: "IT" },
  { code: "pt", name: "Portuguese", flag: "PT" },
  { code: "nl", name: "Dutch", flag: "NL" },
  { code: "ko", name: "Korean", flag: "KR" },
  { code: "zh", name: "Chinese (Simp.)", flag: "CN" },
  { code: "sv", name: "Swedish", flag: "SE" },
  { code: "ru", name: "Russian", flag: "RU" },
  { code: "ar", name: "Arabic", flag: "SA" },
  { code: "hi", name: "Hindi", flag: "IN" },
  { code: "pl", name: "Polish", flag: "PL" },
  { code: "tr", name: "Turkish", flag: "TR" },
];

export interface PathPreset {
  id: string;
  name: string;
  description: string;
  path: string[]; // language codes
}

export const PATH_PRESETS: PathPreset[] = [
  {
    id: "default",
    name: "Lattice Standard (4 Hops)",
    description: "English → Spanish → German → Japanese → English. Balances syntactic diversity and core meaning preservation.",
    path: ["en", "es", "de", "ja", "en"],
  },
  {
    id: "extended",
    name: "Extended Depth (5 Hops)",
    description: "English → Spanish → German → Japanese → French → English. Ideal for long-form essays and formal papers.",
    path: ["en", "es", "de", "ja", "fr", "en"],
  },
  {
    id: "romance",
    name: "Romance Flow (3 Hops)",
    description: "English → French → Spanish → English. Produces fluid, conversational phrasing.",
    path: ["en", "fr", "es", "en"],
  },
  {
    id: "germanic",
    name: "Germanic Precision (3 Hops)",
    description: "English → Dutch → German → English. Cleans up ambiguity while keeping direct structure.",
    path: ["en", "nl", "de", "en"],
  },
  {
    id: "express",
    name: "Light Refresh (2 Hops)",
    description: "English → Spanish → English. Fast turnaround with minimal structural variance.",
    path: ["en", "es", "en"],
  },
];

export interface SamplePrompt {
  label: string;
  tag: string;
  text: string;
}

export const SAMPLE_PROMPTS: SamplePrompt[] = [
  {
    label: "Academic Draft",
    tag: "AI Detection Clichés",
    text: "The utilization of artificial intelligence methodologies facilitates the optimization of operational efficacy across multifaceted computational paradigms. Furthermore, it is important to note that rigorous empirical validation is indispensable to substantiate the underlying theoretical constructs.",
  },
  {
    label: "Business Follow-up",
    tag: "Corporate Stiff",
    text: "I am writing this email to follow up on our previous correspondence regarding the deliverables outlined in the strategic alignment documentation. Please let me know your availability at your earliest convenience so that we may synergize our schedules accordingly.",
  },
  {
    label: "Blog Intro",
    tag: "Formulaic AI Intro",
    text: "In today's fast-paced digital landscape, navigating the complexities of modern software development has become more critical than ever before. In this article, we will delve into the multifaceted aspects and unlock key strategies for sustainable team velocity.",
  },
];
