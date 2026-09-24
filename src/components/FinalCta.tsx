"use client";

import React from "react";
import { ArrowRightIcon } from "./Icons";

interface FinalCtaProps {
  onTryLattice: () => void;
}

export function FinalCta({ onTryLattice }: FinalCtaProps) {
  return (
    <section className="final-cta-section">
      {/* Decorative SVG curves and colored node dots matching Reference Image 2 */}
      <svg
        className="cta-vector-bg"
        viewBox="0 0 1440 300"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Primary soft sweeping wave line */}
        <path
          d="M -100 240 C 200 160, 420 280, 720 200 C 1020 120, 1260 260, 1540 160"
          stroke="#DCE8F8"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
        {/* Secondary gentle wave line */}
        <path
          d="M -50 180 C 260 250, 480 140, 760 240 C 1040 340, 1280 180, 1500 220"
          stroke="#E6EEF9"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Google-colored node dots positioned precisely along the curves */}
        {/* Red dot */}
        <circle cx="160" cy="200" r="4.5" fill="#EA4335" />
        {/* Blue dot */}
        <circle cx="280" cy="165" r="4" fill="#1A73E8" />
        {/* Yellow dot */}
        <circle cx="1140" cy="185" r="4.5" fill="#FBBC05" />
        {/* Green dot */}
        <circle cx="1220" cy="150" r="4" fill="#34A853" />
        {/* Purple / Indigo dot */}
        <circle cx="1290" cy="245" r="4" fill="#7B1FA2" />
      </svg>

      <div className="final-cta-content">
        <h2 className="final-cta-heading">Start with a sentence.</h2>
        <p className="final-cta-sub">
          Transform your text and make it sound more natural in seconds.
        </p>

        <button
          type="button"
          className="final-cta-btn"
          onClick={onTryLattice}
        >
          <span>Try Lattice</span>
          <ArrowRightIcon size={16} color="#FFFFFF" />
        </button>
      </div>
    </section>
  );
}
