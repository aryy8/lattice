"use client";

import React from "react";
import { DotField } from "./DotField";
import { ConnectedFlowDiagram } from "./ConnectedFlowDiagram";

/* Geometric outline benefit illustrations matching Image 2 exactly */
function BreaksPatternIllustration() {
  return (
    <svg width="34" height="34" viewBox="0 0 32 32" fill="none" stroke="#1F1F1F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
      {/* Sleek launch projectile / paper-plane at 45 deg */}
      <path d="M8 18 L26 6 L14 24 L12 16 Z" />
      <path d="M26 6 L12 16" />
      <path d="M4 22 L7 19" />
      <path d="M6 25 L10 21" />
      <path d="M9 28 L12 25" />
    </svg>
  );
}

function KeepsMeaningIllustration() {
  return (
    <svg width="34" height="34" viewBox="0 0 32 32" fill="none" stroke="#1F1F1F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
      {/* Isometric 3D Cube with top, left, right faces */}
      <path d="M16 3.5 L27.5 10 L27.5 23 L16 29.5 L4.5 23 L4.5 10 Z" />
      <path d="M16 16.5 L16 29.5 M16 16.5 L27.5 10 M16 16.5 L4.5 10" />
    </svg>
  );
}

function FeelsNaturalIllustration() {
  return (
    <svg width="34" height="34" viewBox="0 0 32 32" fill="none" style={{ display: "block" }}>
      {/* 4-point sparkle star in top-right matching Image 2 */}
      <path d="M24 2 C24 5.2 25.5 6.8 29 6.8 C25.5 6.8 24 8.4 24 11.6 C24 8.4 22.5 6.8 19 6.8 C22.5 6.8 24 5.2 24 2 Z" fill="#1F1F1F" />
      {/* 4 constellation dots in diamond formation in lower-left */}
      <circle cx="12" cy="14" r="2.2" fill="#1F1F1F" />
      <circle cx="7" cy="19" r="2.2" fill="#1F1F1F" />
      <circle cx="17" cy="19" r="2.2" fill="#1F1F1F" />
      <circle cx="12" cy="24" r="2.2" fill="#1F1F1F" />
    </svg>
  );
}

export function ExplainerSection() {
  return (
    <section className="explainer-section" style={{ position: "relative", overflow: "hidden" }}>
      {/* Radial dot pattern centred on the right (where the diagram sits) */}
      <DotField
        pattern="radial"
        color="26, 115, 232"
        opacity={0.09}
        density={0.9}
        style={{ zIndex: 0 }}
      />

      <div className="lattice-container" style={{ position: "relative", zIndex: 1 }}>
        {/* Top Split: Text on Left, Visual diagram on Right */}
        <div className="explainer-grid">
          <div>
            <div className="section-overline reveal reveal-delay-1">TEXT THAT SOUNDS HUMAN</div>
            <h2 className="section-heading-large reveal reveal-delay-2">
              Same meaning.
              <br />
              A more natural expression.
            </h2>
            <p className="section-body reveal reveal-delay-3">
              Lattice rewrites your text by passing it through multiple languages,
              breaking common AI writing patterns and returning a natural,
              human-like version in your original language.
            </p>
          </div>

          <div className="reveal reveal-delay-2">
            <ConnectedFlowDiagram />
          </div>
        </div>

        {/* Benefits Row (3 columns) matching Image 2 */}
        <div className="benefits-row">
          <div className="benefit-item reveal reveal-delay-1">
            <div className="benefit-icon-badge">
              <BreaksPatternIllustration />
            </div>
            <h3 className="benefit-title">Breaks AI patterns</h3>
            <p className="benefit-desc">
              Rewrites text in a way that avoids common AI-generated patterns
              used by detection tools.
            </p>
          </div>

          <div className="benefit-item reveal reveal-delay-2">
            <div className="benefit-icon-badge">
              <KeepsMeaningIllustration />
            </div>
            <h3 className="benefit-title">Keeps your meaning</h3>
            <p className="benefit-desc">
              Preserves the original intent and key information while
              changing the expression.
            </p>
          </div>

          <div className="benefit-item reveal reveal-delay-3">
            <div className="benefit-icon-badge">
              <FeelsNaturalIllustration />
            </div>
            <h3 className="benefit-title">Feels natural</h3>
            <p className="benefit-desc">
              Produces smooth, readable text that sounds like it was
              written by a person.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
