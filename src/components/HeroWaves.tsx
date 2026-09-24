import React from "react";

export function HeroWaves() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1600 960"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      >
        <defs>
          {/* Base pale blue gradient */}
          <linearGradient id="hero-base-bg" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#F2F7FE" />
            <stop offset="60%" stopColor="#F5F9FE" />
            <stop offset="100%" stopColor="#EEF5FD" />
          </linearGradient>

          {/* Top-left soft fluid wave gradient */}
          <linearGradient id="wave-tl-1" x1="0%" y1="0%" x2="70%" y2="80%">
            <stop offset="0%" stopColor="#DFEEFE" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#E9F4FE" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#F5FAFF" stopOpacity="0.0" />
          </linearGradient>

          {/* Top-left inner ribbon gradient */}
          <linearGradient id="wave-tl-2" x1="0%" y1="0%" x2="60%" y2="60%">
            <stop offset="0%" stopColor="#D2E6FD" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#E2F0FE" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#F5FAFF" stopOpacity="0.0" />
          </linearGradient>

          {/* Right-side wave gradient */}
          <linearGradient id="wave-right" x1="100%" y1="20%" x2="60%" y2="80%">
            <stop offset="0%" stopColor="#DFEEFE" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#EDF6FE" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
          </linearGradient>

          {/* Bottom-right sweeping wave gradient (matching Reference 1 exactly) */}
          <linearGradient id="wave-br-1" x1="30%" y1="0%" x2="90%" y2="100%">
            <stop offset="0%" stopColor="#D5E8FD" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#C9E1FC" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#BBD8FA" stopOpacity="0.98" />
          </linearGradient>

          {/* Bottom-right deep corner accent */}
          <linearGradient id="wave-br-2" x1="40%" y1="20%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C4DEF9" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#AED1F8" stopOpacity="0.98" />
          </linearGradient>
        </defs>

        {/* 0. Base background fill */}
        <rect width="1600" height="960" fill="url(#hero-base-bg)" />

        {/* 1. Top-Left sweeping wave 1 */}
        <path
          d="M -40 -30 
             L 380 -30 
             C 310 180, 200 360, 80 500 
             C 20 570, -20 630, -50 680 
             Z"
          fill="url(#wave-tl-1)"
        />

        {/* 2. Top-Left inner ribbon 2 */}
        <path
          d="M -40 -30 
             L 220 -30 
             C 160 140, 80 290, 0 410 
             Z"
          fill="url(#wave-tl-2)"
        />

        {/* 3. Right-side fluid wave */}
        <path
          d="M 1640 -20 
             L 1360 -20 
             C 1420 180, 1370 340, 1440 500 
             C 1490 600, 1560 670, 1640 710 
             Z"
          fill="url(#wave-right)"
        />

        {/* 4. Bottom-Right Signature Wave (Exact sweeping crest from Reference 1 - slightly taller) */}
        <path
          d="M 580 960 
             C 760 810, 960 650, 1220 620 
             C 1370 605, 1500 645, 1640 685 
             L 1640 960 
             Z"
          fill="url(#wave-br-1)"
        />

        {/* 5. Bottom-Right inner crest accent */}
        <path
          d="M 880 960 
             C 1040 830, 1220 725, 1400 715 
             C 1495 710, 1580 735, 1640 765 
             L 1640 960 
             Z"
          fill="url(#wave-br-2)"
        />

        {/* 6. Delicate light crest highlight line */}
        <path
          d="M 640 960 
             C 800 805, 980 652, 1220 620 
             C 1370 605, 1490 642, 1640 682"
          stroke="#EBF4FD"
          strokeWidth="2.5"
          strokeOpacity="0.85"
          fill="none"
        />
      </svg>
    </div>
  );
}
