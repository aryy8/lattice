"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  LatticeAcademicIcon,
  LatticeCommunicationIcon,
  LatticeContentIcon,
  LatticeReportsIcon,
  LatticeMultilingualIcon,
  LatticeEverydayIcon,
} from "./Icons";

/* ── Ultra-responsive Constellation Canvas (Zero delay, Lattice Logo colors) ── */
function ConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let W = 0, H = 0;

    // Lattice logo palette: Blue, Sky Blue, Red, Yellow, Green
    const LATTICE_COLORS = [
      { rgb: "26, 115, 232", hex: "#1A73E8", weight: 70 }, // Google Blue
      { rgb: "90, 157, 251", hex: "#5A9DFB", weight: 12 }, // Sky Blue
      { rgb: "235, 67, 53",  hex: "#EB4335", weight: 6 },  // Red
      { rgb: "251, 188, 5",  hex: "#FBBC05", weight: 6 },  // Yellow
      { rgb: "52, 168, 83",  hex: "#34A853", weight: 6 },  // Green
    ];

    function pickColor() {
      const rand = Math.random() * 100;
      let acc = 0;
      for (const c of LATTICE_COLORS) {
        acc += c.weight;
        if (rand <= acc) return c;
      }
      return LATTICE_COLORS[0];
    }

    type Particle = {
      ox: number; oy: number;
      x: number; y: number;
      r: number;
      alpha: number;
      targetAlpha: number;
      breathSpeed: number;
      color: { rgb: string; hex: string };
      proximity: number;
    };

    let particles: Particle[] = [];

    function resize() {
      if (!canvas) return;
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx!.scale(dpr, dpr);
      buildParticles();
    }

    function buildParticles() {
      particles = [];
      const GAP = 48;
      const cols = Math.ceil(W / GAP) + 1;
      const rows = Math.ceil(H / GAP) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ox = c * GAP + (r % 2) * (GAP / 2);
          const oy = r * GAP * 0.866;
          const a = Math.random() * 0.16 + 0.08;
          particles.push({
            ox, oy, x: ox, y: oy,
            r: Math.random() * 1.1 + 0.9,
            alpha: a,
            targetAlpha: a,
            breathSpeed: Math.random() * 0.008 + 0.004,
            color: pickColor(),
            proximity: 0,
          });
        }
      }
    }

    resize();

    const REPEL_RADIUS = 135;
    const MAX_PUSH = 38;
    const CONNECT_DIST = 72;
    const CURSOR_CONNECT_DIST = 110;

    function draw() {
      ctx!.clearRect(0, 0, W, H);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mouseActive = mouseRef.current.active && mx > -50 && mx < W + 50 && my > -50 && my < H + 50;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        let targetX = p.ox;
        let targetY = p.oy;
        let prox = 0;

        if (mouseActive) {
          const dx = p.ox - mx;
          const dy = p.oy - my;
          const dist = Math.hypot(dx, dy);

          if (dist < REPEL_RADIUS && dist > 0) {
            prox = 1 - dist / REPEL_RADIUS;
            const push = Math.pow(prox, 1.3) * MAX_PUSH;
            targetX = p.ox + (dx / dist) * push;
            targetY = p.oy + (dy / dist) * push;
          }
        }

        p.x += (targetX - p.x) * 0.38;
        p.y += (targetY - p.y) * 0.38;
        p.proximity = prox;

        p.alpha += (p.targetAlpha - p.alpha) * p.breathSpeed * 3;
        if (Math.abs(p.alpha - p.targetAlpha) < 0.005) {
          p.targetAlpha = Math.random() * 0.18 + 0.06;
        }
      }

      ctx!.lineWidth = 0.75;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          if (Math.abs(dx) > CONNECT_DIST || Math.abs(dy) > CONNECT_DIST) continue;
          const d = Math.hypot(dx, dy);
          if (d < CONNECT_DIST) {
            const lineAlpha = (1 - d / CONNECT_DIST) * (0.09 + Math.max(a.proximity, b.proximity) * 0.22);
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.strokeStyle = `rgba(26, 115, 232, ${lineAlpha})`;
            ctx!.stroke();
          }
        }
      }

      if (mouseActive) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const cdx = p.x - mx;
          const cdy = p.y - my;
          const cdist = Math.hypot(cdx, cdy);
          if (cdist < CURSOR_CONNECT_DIST) {
            const cursorAlpha = (1 - cdist / CURSOR_CONNECT_DIST) * 0.32;
            ctx!.beginPath();
            ctx!.moveTo(mx, my);
            ctx!.lineTo(p.x, p.y);
            ctx!.strokeStyle = `rgba(${p.color.rgb}, ${cursorAlpha})`;
            ctx!.lineWidth = 1;
            ctx!.stroke();
          }
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const drawAlpha = Math.min(0.95, p.alpha + p.proximity * 0.55);
        const drawRadius = p.r * (1 + p.proximity * 0.75);

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, drawRadius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${p.color.rgb}, ${drawAlpha})`;
        ctx!.fill();

        if (p.proximity > 0.4 && p.color.rgb !== "26, 115, 232") {
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, drawRadius + 2.5, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${p.color.rgb}, ${p.proximity * 0.18})`;
          ctx!.fill();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    draw();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= -40 && x <= rect.width + 40 && y >= -40 && y <= rect.height + 40) {
        mouseRef.current = { x, y, active: true };
      } else {
        mouseRef.current.active = false;
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="uc2-canvas"
      aria-hidden="true"
    />
  );
}

/* ── Typewriter with vibrant Lattice logo colors ── */
function Typewriter({
  items,
  activeIndex,
}: {
  items: { text: string; color: string }[];
  activeIndex: number;
}) {
  const currentTarget = items[activeIndex];
  const [displayed, setDisplayed] = useState(currentTarget?.text || "");
  const [phase, setPhase] = useState<"typing" | "hold" | "erasing">("hold");
  const targetRef = useRef(currentTarget);
  const currentTextRef = useRef(currentTarget?.text);
  const [activeColor, setActiveColor] = useState(currentTarget?.color || "#1A73E8");

  useEffect(() => {
    const newItem = items[activeIndex];
    if (newItem && newItem.text !== currentTextRef.current) {
      currentTextRef.current = newItem.text;
      targetRef.current = newItem;
      setPhase("erasing");
    }
  }, [activeIndex, items]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      const target = targetRef.current;
      setActiveColor(target.color);
      if (displayed.length < target.text.length) {
        timeout = setTimeout(() => {
          setDisplayed(target.text.slice(0, displayed.length + 1));
        }, 40);
      } else {
        timeout = setTimeout(() => setPhase("hold"), 3200);
      }
    } else if (phase === "hold") {
      // Phase held until next active index transition
    } else if (phase === "erasing") {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 22);
      } else {
        setActiveColor(targetRef.current.color);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, phase]);

  return (
    <span className="uc2-typewriter-wrapper" style={{ color: activeColor }}>
      <span className="uc2-typewriter-text" style={{ color: activeColor }}>{displayed}</span>
      <span className="uc2-cursor" style={{ backgroundColor: activeColor }} aria-hidden="true" />
    </span>
  );
}

/* ── Use Case Specifications (How each writing differs & how Lattice bypasses AI detection) ── */
const USE_CASES = [
  {
    id: "academic",
    title: "Academic writing",
    typewriterWord: "academic writing",
    subtitle: "Dissertations, research papers & journals",
    accent: "#1A73E8", // Google Blue
    icon: LatticeAcademicIcon,
    paragraphs: [
      "Academic writing is fundamentally different from conversational or commercial copy: it demands rigorous formal discipline, precise domain terminology, and complex syntactic hypotaxis rather than conversational flow or marketing brevity. When scholars draft with conventional AI models, tools like Turnitin, GPTZero, and Copyleaks flag the text immediately because generic LLMs rely on predictable transition crutches ('furthermore,' 'in conclusion,' 'it is imperative to acknowledge') and uniform sentence lengths.",
      "Lattice bypasses AI detection in academic work by preserving citations, scholarly tone, and methodological precision while restructuring sentence syntax through multi-hop translation manifolds. This process introduces authentic human burstiness and syntactic variance, ensuring your dissertations, peer-reviewed submissions, and literature reviews sail past AI detectors with full scholarly integrity.",
    ],
  },
  {
    id: "email",
    title: "Emails & communication",
    typewriterWord: "emails & communication",
    subtitle: "Outreach, follow-ups & client proposals",
    accent: "#EA4335", // Lattice Red
    icon: LatticeCommunicationIcon,
    paragraphs: [
      "Professional communication is distinct because its success hinges on interpersonal warmth, situational context, and executive brevity. Standard AI outputs for emails are notorious for stiff, sycophantic clichés ('I hope this email finds you well,' 'I am reaching out today in order to ascertain') that immediately trigger recipient skepticism, corporate email security filters, and workplace AI detectors.",
      "Lattice bypasses AI detection by stripping synthetic corporate templates and restoring the natural, confident cadence of authentic human conversation. By reconstructing the draft through cross-lingual bridges, Lattice introduces varied sentence starters, organic phrasing, and crisp human pacing. The resulting outreach sounds unmistakably personal and executive, bypassing automated workplace AI filters and spam radars while preserving your core call-to-action.",
    ],
  },
  {
    id: "content",
    title: "Content creation",
    typewriterWord: "content creation",
    subtitle: "Articles, blogs, LinkedIn & ad copy",
    accent: "#34A853", // Lattice Green
    icon: LatticeContentIcon,
    paragraphs: [
      "Editorial articles, blogs, and public thought leadership rely entirely on a distinct authorial voice, rhetorical rhythm, and emotional resonance. Generic LLMs homogenize creative writing into bland AI slop loaded with overused filler ('in today's fast-paced digital landscape,' 'delve into,' 'a tapestry of innovation') that search engine algorithms and AI detectors penalize as low-effort automated content.",
      "Lattice bypasses AI detection by dismantling the statistical token-probability curves that search engines and AI classifiers monitor. As your draft journeys across linguistic pathways, it sheds sterile AI clichés and absorbs vivid, idiomatic formulations native to other language traditions. The reconstructed output delivers a sharp, memorable voice with high semantic perplexity and organic sentence variety, allowing your copy to rank high on search engines while connecting authentically with real human readers.",
    ],
  },
  {
    id: "reports",
    title: "Reports & documentation",
    typewriterWord: "reports & documentation",
    subtitle: "Technical docs, whitepapers & summaries",
    accent: "#EA8600", // Lattice Amber
    icon: LatticeReportsIcon,
    paragraphs: [
      "Technical reports and system documentation require uncompromising informational density, operational accuracy, and structural clarity without padding. Standard AI drafting tools tend to bloat technical explanations with hollow corporate abstractions ('leverages cutting-edge methodologies') and low-entropy sentence structures that enterprise verification filters flag as synthetic.",
      "Lattice bypasses AI detection in technical documentation by isolating system nomenclature, data parameters, and architectural facts, then reconstructing the explanatory prose with varied syntactic framing. By balancing passive explanations and active technical directives, Lattice eliminates low-entropy repetition while delivering concise, unambiguous clarity. Your engineering docs and whitepapers pass automated compliance scanners effortlessly while remaining crisp and actionable for technical teams.",
    ],
  },
  {
    id: "multilingual",
    title: "Multilingual expression",
    typewriterWord: "multilingual expression",
    subtitle: "Cross-lingual nuances & localization",
    accent: "#1A73E8", // Sky Blue
    icon: LatticeMultilingualIcon,
    paragraphs: [
      "Cross-lingual writing and localization are far more nuanced than simple translation; they require navigating cultural metaphors, idiomatic nuances, and regional speech cadences that direct machine translation completely flattens. Standard AI translation produces rigid calques—direct word-for-word grammatical transfers—that feel emotionally hollow and trigger cross-lingual AI detection systems designed to catch automated translation artifacts.",
      "Lattice bypasses AI detection by abandoning linear translation in favor of semantic re-anchoring. By guiding your thoughts through a calibrated multi-language lattice, concepts absorb the cultural and syntactic idiosyncrasies of intermediate languages before returning to the target tongue. The resulting text resonates with native idiomatic warmth and authentic linguistic intuition, effortlessly bypassing cross-lingual AI detectors while communicating across global boundaries with genuine human nuance.",
    ],
  },
  {
    id: "everyday",
    title: "Everyday writing",
    typewriterWord: "everyday writing",
    subtitle: "Slack notes, intros & daily drafts",
    accent: "#7B1FA2", // Lattice Purple
    icon: LatticeEverydayIcon,
    paragraphs: [
      "Everyday writing—such as team updates, Slack notes, quick intros, and collaborative feedback—is defined by its spontaneity, casual ease, and unforced brevity. Traditional AI assistants over-engineer informal communication, injecting unnatural formality, exaggerated enthusiasm, and excessive punctuation that teammates instantly recognize as artificial.",
      "Lattice bypasses AI detection by stripping away the rigid symmetry and over-polished tone characteristic of machine generation. It loosens the prose, restores natural contractions, and introduces organic conversational brevity. Your daily messages read as effortless, spontaneous, and authentic human correspondence, leaving zero trace for workplace monitoring tools or AI detectors.",
    ],
  },
];

export function UseCases() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cycleRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetCycle = useCallback(() => {
    if (cycleRef.current) clearInterval(cycleRef.current);
    cycleRef.current = setInterval(() => {
      if (!isHovered) {
        setActiveIdx((i) => (i + 1) % USE_CASES.length);
      }
    }, 7500);
  }, [isHovered]);

  useEffect(() => {
    resetCycle();
    return () => {
      if (cycleRef.current) clearInterval(cycleRef.current);
    };
  }, [resetCycle]);

  const handleSelect = (idx: number) => {
    setActiveIdx(idx);
    resetCycle();
  };

  const active = USE_CASES[activeIdx];

  const typewriterItems = USE_CASES.map((u) => ({
    text: u.typewriterWord,
    color: u.accent,
  }));

  return (
    <section className="uc2-section" id="use-cases">
      {/* Zero-delay interactive constellation canvas */}
      <ConstellationCanvas />

      <div className="lattice-container uc2-inner">
        {/* Left-aligned overline */}
        <div className="uc2-header-left reveal">
          <span className="section-overline">USE CASES & PRESETS</span>
          
          {/* Format from Image 3: Left-aligned, stacked, only main word typewritten */}
          <h2 className="uc2-hero-heading">
            <span className="uc2-hero-static">Built for</span>
            <span className="uc2-hero-dynamic">
              <Typewriter
                items={typewriterItems}
                activeIndex={activeIdx}
              />
            </span>
          </h2>
        </div>

        {/* Clean Preset Selector Pills to browse use cases */}
        <div className="uc2-pills-bar reveal reveal-delay-1" role="tablist" aria-label="Use cases">
          {USE_CASES.map((uc, i) => {
            const IconComp = uc.icon;
            const isActive = activeIdx === i;
            return (
              <button
                key={uc.id}
                role="tab"
                aria-selected={isActive}
                className={`uc2-pill${isActive ? " uc2-pill--active" : ""}`}
                style={{ "--pill-accent": uc.accent } as React.CSSProperties}
                onClick={() => handleSelect(i)}
              >
                <span className="uc2-pill-icon">
                  <IconComp size={16} />
                </span>
                <span className="uc2-pill-label">{uc.title}</span>
              </button>
            );
          })}
        </div>

        {/* Format from Image 2: Clean heading + pure typography content, NO color path, NO text box outline */}
        <div
          className="uc2-editorial-block reveal reveal-delay-2"
          key={active.id}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <h3 className="uc2-editorial-heading">{active.title}</h3>
          <div className="uc2-editorial-content">
            {active.paragraphs.map((p, idx) => (
              <p key={idx} className="uc2-editorial-paragraph">
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Footer controls: pagination dots & counter */}
        <div className="uc2-footer reveal">
          <div className="uc2-progress-dots" aria-label="Slide controls">
            {USE_CASES.map((uc, i) => (
              <button
                key={uc.id}
                className={`uc2-progress-dot${activeIdx === i ? " uc2-progress-dot--active" : ""}`}
                style={{ background: activeIdx === i ? active.accent : undefined }}
                onClick={() => handleSelect(i)}
                aria-label={`Go to ${uc.title}`}
              />
            ))}
          </div>
          <div className="uc2-counter">
            <span className="uc2-counter-current">{String(activeIdx + 1).padStart(2, "0")}</span>
            <span className="uc2-counter-sep">/</span>
            <span className="uc2-counter-total">{String(USE_CASES.length).padStart(2, "0")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
