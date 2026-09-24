import React from "react";
import { DocumentIcon, GlobeIcon, SunIcon } from "./Icons";
import { ConnectedFlowDiagram } from "./ConnectedFlowDiagram";

export function ExplainerSection() {
  return (
    <section className="explainer-section">
      <div className="lattice-container">
        {/* Top Split: Text on Left, Visual diagram on Right */}
        <div className="explainer-grid">
          <div>
            <div className="section-overline">TEXT THAT SOUNDS HUMAN</div>
            <h2 className="section-heading-large">
              Same meaning.
              <br />
              A more natural expression.
            </h2>
            <p className="section-body">
              Lattice rewrites your text by passing it through multiple languages,
              breaking common AI writing patterns and returning a natural,
              human-like version in your original language.
            </p>
          </div>

          {/* Visual Diagram matching Reference Image 2 & user attached crop exactly */}
          <ConnectedFlowDiagram />
        </div>

        {/* Benefits Row (3 columns) */}
        <div className="benefits-row">
          <div className="benefit-item">
            <div className="benefit-icon-badge">
              <DocumentIcon size={22} color="#1A73E8" />
            </div>
            <h3 className="benefit-title">Breaks AI patterns</h3>
            <p className="benefit-desc">
              Rewrites text in a way that avoids common AI-generated patterns
              used by detection tools.
            </p>
          </div>

          <div className="benefit-item">
            <div className="benefit-icon-badge">
              <GlobeIcon size={22} color="#1A73E8" />
            </div>
            <h3 className="benefit-title">Keeps your meaning</h3>
            <p className="benefit-desc">
              Preserves the original intent and key information while
              changing the expression.
            </p>
          </div>

          <div className="benefit-item">
            <div className="benefit-icon-badge">
              <SunIcon size={22} color="#1A73E8" />
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
