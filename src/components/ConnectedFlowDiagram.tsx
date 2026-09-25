"use client";

import React, { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   Animated dot-field canvas (Antigravity style)
   ───────────────────────────────────────────── */
function DotCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width = W * devicePixelRatio;
    canvas.height = H * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);

    const COLS = 22;
    const ROWS = 12;
    const GAP_X = W / (COLS - 1);
    const GAP_Y = H / (ROWS - 1);

    type Dot = {
      x: number;
      y: number;
      ox: number;
      oy: number;
      r: number;
      alpha: number;
      targetAlpha: number;
      alphaSpeed: number;
      phase: number;
      speed: number;
    };

    const dots: Dot[] = [];
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const ox = col * GAP_X;
        const oy = row * GAP_Y;
        const r = Math.random() * 1.2 + 0.6;
        const alpha = Math.random() * 0.25 + 0.05;
        dots.push({
          x: ox + (Math.random() - 0.5) * 8,
          y: oy + (Math.random() - 0.5) * 8,
          ox,
          oy,
          r,
          alpha,
          targetAlpha: alpha,
          alphaSpeed: Math.random() * 0.008 + 0.003,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.015 + 0.005,
        });
      }
    }

    let frame = 0;
    let raf: number;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      frame++;

      for (const d of dots) {
        // Gentle float
        d.x = d.ox + Math.sin(frame * d.speed + d.phase) * 4;
        d.y = d.oy + Math.cos(frame * d.speed * 0.7 + d.phase) * 3;

        // Breathe opacity
        d.alpha += (d.targetAlpha - d.alpha) * d.alphaSpeed * 3;
        if (Math.abs(d.alpha - d.targetAlpha) < 0.005) {
          d.targetAlpha = Math.random() * 0.3 + 0.04;
        }

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(26, 115, 232, ${d.alpha})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    draw();

    const ro = new ResizeObserver(() => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * devicePixelRatio;
      canvas.height = H * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

/* ─────────────────────────────────────────────
   Main diagram
   ───────────────────────────────────────────── */
export function ConnectedFlowDiagram() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;
    path.style.transition = "none";

    // Trigger draw after a frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        path.style.transition = "stroke-dashoffset 1.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s";
        path.style.strokeDashoffset = "0";
      });
    });
  }, []);

  return (
    <div className="connected-flow-wrapper">
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 666,
          height: 320,
          marginLeft: "auto",
        }}
      >
        {/* Animated dot-field background */}
        <DotCanvas />

        {/* SVG Diagram on top */}
        <svg
          viewBox="0 0 666 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "relative", width: "100%", height: "100%", zIndex: 1 }}
        >
          <defs>
            <linearGradient
              id="flow-curve-gradient"
              x1="142"
              y1="111"
              x2="448"
              y2="236"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#BDD7FA" />
              <stop offset="30%" stopColor="#BDD7FA" />
              <stop offset="55%" stopColor="#BCE1DF" />
              <stop offset="82%" stopColor="#9ADBB3" />
              <stop offset="100%" stopColor="#5BB974" />
            </linearGradient>

            <filter id="pill-shadow" x="-8%" y="-15%" width="116%" height="145%">
              <feDropShadow
                dx="0"
                dy="2"
                stdDeviation="3"
                floodColor="#202124"
                floodOpacity="0.07"
              />
            </filter>

            {/* Glow filter for pulsing dots */}
            <filter id="dot-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Animated flowing S-Curve */}
          <path
            ref={pathRef}
            d="M 142 111 C 160 134, 194 177, 228 177 C 255 177, 280 159, 312 159 C 348 159, 392 202, 428 233 C 434 235, 442 236, 448 236"
            stroke="url(#flow-curve-gradient)"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />

          {/* ── PILL 1: Your text ── */}
          <g style={{ animation: "pillFadeIn 0.5s ease 0.8s both" }}>
            <g filter="url(#pill-shadow)">
              <rect x="60" y="63.5" width="144" height="48" rx="24"
                fill="#E8F0FE" stroke="rgba(210,227,252,0.85)" strokeWidth="1" />
            </g>
            {/* Pulsing node dot */}
            <circle cx="60" cy="87.5" r="4.5" fill="#1A73E8" filter="url(#dot-glow)">
              <animate attributeName="r" values="4.5;6.5;4.5" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0.6;1" dur="2.4s" repeatCount="indefinite" />
            </circle>
            {/* Blue play icon */}
            <path
              d="M 85 81 C 85 80.2 85.8 79.7 86.6 80.1 L 94.6 85.1 C 95.3 85.5 95.3 86.5 94.6 86.9 L 86.6 91.9 C 85.8 92.3 85 91.8 85 91 Z"
              fill="#1A73E8"
            />
            <text x="105" y="92.5" fill="#202124" fontSize="14.5" fontWeight="500"
              fontFamily="inherit" letterSpacing="-0.01em">
              Your text
            </text>
          </g>

          {/* ── NODE DOT 2 (Blue) ── */}
          <g style={{ animation: "pillFadeIn 0.4s ease 1.4s both" }}>
            <circle cx="228" cy="177" r="4.5" fill="#1A73E8" filter="url(#dot-glow)">
              <animate attributeName="r" values="4.5;6;4.5" dur="2.8s" begin="0.6s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0.55;1" dur="2.8s" begin="0.6s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* ── PILL 2: Through languages ── */}
          <g style={{ animation: "pillFadeIn 0.5s ease 1.4s both" }}>
            <g filter="url(#pill-shadow)">
              <rect x="234" y="112" width="204" height="48" rx="24"
                fill="#FEF7E0" stroke="rgba(254,239,195,0.85)" strokeWidth="1" />
            </g>
            <path
              d="M 254 130 C 254 129.2 254.8 128.7 255.6 129.1 L 263.6 134.1 C 264.3 134.5 264.3 135.5 263.6 135.9 L 255.6 140.9 C 254.8 141.3 254 140.8 254 140 Z"
              fill="#F9AB00"
            />
            <text x="276" y="141" fill="#202124" fontSize="14.5" fontWeight="500"
              fontFamily="inherit" letterSpacing="-0.01em">
              Through languages
            </text>
          </g>

          {/* ── PILL 3: Human-like result ── */}
          <g style={{ animation: "pillFadeIn 0.5s ease 2s both" }}>
            <g filter="url(#pill-shadow)">
              <rect x="434" y="190" width="206" height="48" rx="24"
                fill="#E6F4EA" stroke="rgba(206,234,214,0.85)" strokeWidth="1" />
            </g>
            {/* Pulsing green dot */}
            <circle cx="428" cy="233" r="4.5" fill="#34A853" filter="url(#dot-glow)">
              <animate attributeName="r" values="4.5;6.5;4.5" dur="2.6s" begin="1.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0.5;1" dur="2.6s" begin="1.2s" repeatCount="indefinite" />
            </circle>
            {/* Green diamond */}
            <polygon points="459,209.5 464,214.5 459,219.5 454,214.5" fill="#1E8E3E" />
            <text x="476" y="219" fill="#202124" fontSize="14.5" fontWeight="500"
              fontFamily="inherit" letterSpacing="-0.01em">
              Human-like result
            </text>
          </g>

          {/* Moving particle along the path */}
          <circle r="5" fill="#1A73E8" opacity="0.75">
            <animateMotion
              dur="3.2s"
              repeatCount="indefinite"
              begin="2.1s"
              path="M 142 111 C 160 134, 194 177, 228 177 C 255 177, 280 159, 312 159 C 348 159, 392 202, 428 233 C 434 235, 442 236, 448 236"
            />
            <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.05;0.9;1" dur="3.2s" repeatCount="indefinite" begin="2.1s" />
            <animate attributeName="r" values="4;5.5;4" dur="3.2s" repeatCount="indefinite" begin="2.1s" />
          </circle>
        </svg>
      </div>

      <style>{`
        @keyframes pillFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
