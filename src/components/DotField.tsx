"use client";

import { useEffect, useRef } from "react";

export type DotPattern = "grid" | "diagonal" | "radial" | "scatter" | "wave" | "arc";

interface DotFieldProps {
  pattern?: DotPattern;
  color?: string;
  opacity?: number;
  density?: number; // 1 = normal, 2 = denser
  className?: string;
  style?: React.CSSProperties;
}

export function DotField({
  pattern = "grid",
  color = "26, 115, 232",
  opacity = 0.18,
  density = 1,
  className,
  style,
}: DotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let W = 0, H = 0;

    function resize() {
      if (!canvas || !ctx) return;
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
    }

    resize();

    type Dot = {
      x: number; y: number;
      r: number;
      alpha: number; targetAlpha: number;
      phase: number; speed: number; wSpeed: number;
    };

    function buildDots(): Dot[] {
      const dots: Dot[] = [];
      const spacing = Math.round(28 / density);

      if (pattern === "grid") {
        const cols = Math.ceil(W / spacing) + 1;
        const rows = Math.ceil(H / spacing) + 1;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            dots.push(makeDot(c * spacing, r * spacing));
          }
        }

      } else if (pattern === "diagonal") {
        const gap = Math.round(36 / density);
        const cols = Math.ceil((W + H) / gap) + 2;
        for (let i = -2; i < cols; i++) {
          for (let j = 0; j < Math.ceil(H / gap) + 2; j++) {
            const x = i * gap + j * gap * 0.5;
            const y = j * gap;
            if (x >= -gap && x <= W + gap && y >= -gap && y <= H + gap) {
              dots.push(makeDot(x, y));
            }
          }
        }

      } else if (pattern === "radial") {
        const cx = W / 2, cy = H / 2;
        const rings = Math.ceil(Math.max(W, H) / (spacing * 1.6)) + 1;
        dots.push(makeDot(cx, cy)); // centre
        for (let ring = 1; ring < rings; ring++) {
          const r = ring * spacing * 1.6;
          const count = Math.round((2 * Math.PI * r) / spacing);
          for (let k = 0; k < count; k++) {
            const angle = (2 * Math.PI * k) / count;
            dots.push(makeDot(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r));
          }
        }

      } else if (pattern === "scatter") {
        const count = Math.round((W * H) / (spacing * spacing * 2.5));
        for (let i = 0; i < count; i++) {
          dots.push(makeDot(Math.random() * W, Math.random() * H));
        }

      } else if (pattern === "wave") {
        const cols = Math.ceil(W / spacing) + 1;
        const rows = Math.ceil(H / spacing) + 1;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const y = r * spacing + Math.sin((c / cols) * Math.PI * 2) * (spacing * 1.4);
            dots.push(makeDot(c * spacing, y));
          }
        }

      } else if (pattern === "arc") {
        // Concentric arcs from bottom-left corner
        const arcCount = Math.ceil(Math.max(W, H) / (spacing * 1.5)) + 2;
        for (let arc = 1; arc < arcCount; arc++) {
          const r = arc * spacing * 1.5;
          const totalAngle = Math.PI / 2; // quarter circle
          const count = Math.round((totalAngle * r) / spacing);
          for (let k = 0; k <= count; k++) {
            const angle = (totalAngle * k) / count;
            const x = r * Math.cos(angle);
            const y = H - r * Math.sin(angle);
            if (x >= 0 && x <= W && y >= 0 && y <= H) {
              dots.push(makeDot(x, y));
            }
          }
        }
      }

      return dots;
    }

    function makeDot(x: number, y: number): Dot {
      const a = Math.random() * opacity * 0.8 + opacity * 0.1;
      return {
        x, y,
        r: Math.random() * 1.0 + 0.7,
        alpha: a,
        targetAlpha: a,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.012 + 0.004,
        wSpeed: Math.random() * 0.008 + 0.003,
      };
    }

    let dots = buildDots();
    let frame = 0;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      frame++;

      for (const d of dots) {
        // Breathe opacity
        d.alpha += (d.targetAlpha - d.alpha) * d.wSpeed * 4;
        if (Math.abs(d.alpha - d.targetAlpha) < 0.004) {
          d.targetAlpha = Math.random() * opacity * 0.9 + opacity * 0.05;
        }

        // Subtle float
        const fx = Math.sin(frame * d.speed + d.phase) * 1.8;
        const fy = Math.cos(frame * d.speed * 0.8 + d.phase + 1) * 1.5;

        ctx.beginPath();
        ctx.arc(d.x + fx, d.y + fy, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${Math.max(0, d.alpha)})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    draw();

    const ro = new ResizeObserver(() => {
      resize();
      dots = buildDots();
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [pattern, color, opacity, density]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}
