"use client";

import React from "react";
import { ArrowRightIcon } from "./Icons";

interface FinalCtaProps {
  onTryLattice: () => void;
}

export function FinalCta({ onTryLattice }: FinalCtaProps) {
  return (
    <section className="final-cta-section">
      {/* Decorative SVG curves and colored node dots */}
      <svg
        className="cta-vector-bg"
        viewBox="0 0 1440 340"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Primary soft sweeping wave line */}
        <path
          d="M -100 280 C 200 180, 420 320, 720 230 C 1020 140, 1260 290, 1540 190"
          stroke="#C8DCEF"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Secondary gentle wave line */}
        <path
          d="M -50 200 C 260 280, 480 160, 760 270 C 1040 370, 1280 200, 1500 250"
          stroke="#D5E8D4"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />
        {/* Google-colored node dots */}
        <circle cx="160" cy="220" r="5" fill="rgba(234,67,53,0.5)" />
        <circle cx="290" cy="182" r="4" fill="rgba(26,115,232,0.5)" />
        <circle cx="1140" cy="205" r="5" fill="rgba(251,188,5,0.6)" />
        <circle cx="1230" cy="166" r="4" fill="rgba(52,168,83,0.5)" />
        <circle cx="1310" cy="268" r="4" fill="rgba(123,31,162,0.5)" />
      </svg>

      <div className="final-cta-content">
        <p className="final-cta-eyebrow reveal">Ready to try it?</p>
        <h2 className="final-cta-heading reveal reveal-delay-1">Start with a sentence.</h2>
        <p className="final-cta-sub reveal reveal-delay-2">
          Transform your text and make it sound more natural in seconds.
        </p>

        <button
          type="button"
          className="final-cta-btn reveal reveal-delay-3"
          onClick={onTryLattice}
        >
          <span>Try Lattice</span>
          <ArrowRightIcon size={17} color="#FFFFFF" />
        </button>
      </div>
    </section>
  );
}
