import React from "react";

export function ConnectedFlowDiagram() {
  return (
    <div className="connected-flow-wrapper">
      <svg
        viewBox="0 0 666 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="connected-flow-svg"
      >
        <defs>
          {/* Smooth vector gradient transitioning from light blue across cyan-green to mint green */}
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

          {/* Soft drop shadow matching reference pills */}
          <filter id="pill-shadow" x="-8%" y="-15%" width="116%" height="145%">
            <feDropShadow
              dx="0"
              dy="1.5"
              stdDeviation="2.5"
              floodColor="#202124"
              floodOpacity="0.04"
            />
          </filter>
        </defs>

        {/* 1. Continuous Flowing S-Curve */}
        <path
          d="M 142 111 C 160 134, 194 177, 228 177 C 255 177, 280 159, 312 159 C 348 159, 392 202, 428 233 C 434 235, 442 236, 448 236"
          stroke="url(#flow-curve-gradient)"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* --- PILL 1: Your text (Top Left) --- */}
        <g filter="url(#pill-shadow)">
          <rect
            x="60"
            y="63.5"
            width="144"
            height="48"
            rx="24"
            fill="#E8F0FE"
            stroke="rgba(210, 227, 252, 0.85)"
            strokeWidth="1"
          />
        </g>
        {/* Blue Node Dot 1 situated on the left apex curve */}
        <circle cx="60" cy="87.5" r="4.5" fill="#1A73E8" />
        {/* Blue Play/Triangle Icon */}
        <path
          d="M 85 81 C 85 80.2 85.8 79.7 86.6 80.1 L 94.6 85.1 C 95.3 85.5 95.3 86.5 94.6 86.9 L 86.6 91.9 C 85.8 92.3 85 91.8 85 91 Z"
          fill="#1A73E8"
        />
        {/* Pill 1 Text: dark charcoal */}
        <text
          x="105"
          y="92.5"
          fill="#202124"
          fontSize="14.5"
          fontWeight="500"
          fontFamily="inherit"
          letterSpacing="-0.01em"
        >
          Your text
        </text>

        {/* --- NODE DOT 2 (Blue) at valley inflection point --- */}
        <circle cx="228" cy="177" r="4.5" fill="#1A73E8" />

        {/* --- PILL 2: Through languages (Middle) --- */}
        <g filter="url(#pill-shadow)">
          <rect
            x="234"
            y="112"
            width="204"
            height="48"
            rx="24"
            fill="#FEF7E0"
            stroke="rgba(254, 239, 195, 0.85)"
            strokeWidth="1"
          />
        </g>
        {/* Amber Play/Triangle Icon */}
        <path
          d="M 254 130 C 254 129.2 254.8 128.7 255.6 129.1 L 263.6 134.1 C 264.3 134.5 264.3 135.5 263.6 135.9 L 255.6 140.9 C 254.8 141.3 254 140.8 254 140 Z"
          fill="#F9AB00"
        />
        {/* Pill 2 Text: dark charcoal */}
        <text
          x="276"
          y="141"
          fill="#202124"
          fontSize="14.5"
          fontWeight="500"
          fontFamily="inherit"
          letterSpacing="-0.01em"
        >
          Through languages
        </text>

        {/* --- PILL 3: Human-like result (Bottom Right) --- */}
        <g filter="url(#pill-shadow)">
          <rect
            x="434"
            y="190"
            width="206"
            height="48"
            rx="24"
            fill="#E6F4EA"
            stroke="rgba(206, 234, 214, 0.85)"
            strokeWidth="1"
          />
        </g>
        {/* Green Node Dot 3 at the bottom-left curve meeting point */}
        <circle cx="428" cy="233" r="4.5" fill="#34A853" />
        {/* Green Diamond Icon */}
        <polygon
          points="459,209.5 464,214.5 459,219.5 454,214.5"
          fill="#1E8E3E"
        />
        {/* Pill 3 Text: dark charcoal */}
        <text
          x="476"
          y="219"
          fill="#202124"
          fontSize="14.5"
          fontWeight="500"
          fontFamily="inherit"
          letterSpacing="-0.01em"
        >
          Human-like result
        </text>
      </svg>
    </div>
  );
}
