"use client";

import React from "react";
import { Flag } from "./Flags";
import { ArrowRightIcon } from "./Icons";
import { DotField } from "./DotField";

export function HowItWorks() {
  const steps = [
    { code: "US", name: "English" },
    { code: "ES", name: "Spanish" },
    { code: "DE", name: "German" },
    { code: "JP", name: "Japanese" },
    { code: "US", name: "English" },
  ];

  return (
    <section className="how-it-works-section">
      <div className="lattice-container">
        <div className="how-it-works-card reveal" style={{ position: "relative", overflow: "hidden" }}>
          {/* Wave dot pattern inside the card */}
          <DotField
            pattern="wave"
            color="26, 115, 232"
            opacity={0.08}
            density={0.9}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="section-overline">HOW IT WORKS</div>
            <h2 className="how-heading">A different path to the same idea.</h2>
            <p className="how-desc">
              Your text is translated through a sequence of languages and then
              brought back to your original language, resulting in a fresh and
              natural expression.
            </p>
          </div>

          {/* Right Visual Sequence */}
          <div className="how-sequence" style={{ position: "relative", zIndex: 1 }}>
            {steps.map((step, idx) => (
              <React.Fragment key={`${step.name}-${idx}`}>
                <div className="how-node-card">
                  <Flag code={step.code} size={32} />
                  <span className="how-node-name">{step.name}</span>
                </div>

                {idx < steps.length - 1 && (
                  <span className="how-arrow">
                    <ArrowRightIcon size={16} color="#80868B" />
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
