"use client";

import React from "react";
import { CloseIcon } from "./Icons";
import { TransformationOptions } from "@/lib/transformer";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  options: TransformationOptions;
  onOptionsChange: (newOptions: TransformationOptions) => void;
}

export function SettingsModal({
  isOpen,
  onClose,
  options,
  onOptionsChange,
}: SettingsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 95 }}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Settings & Preferences</h3>
          <button
            type="button"
            onClick={onClose}
            style={{
              color: "#5F6368",
              padding: "4px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <CloseIcon size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: 600,
                color: "#202124",
                marginBottom: "4px",
              }}
            >
              Default Output Tone
            </label>
            <p style={{ fontSize: "12.5px", color: "#5F6368", marginBottom: "8px" }}>
              Sets the natural stylistic cadence for transformed text.
            </p>
            <select
              value={options.tone}
              onChange={(e) =>
                onOptionsChange({
                  ...options,
                  tone: e.target.value as TransformationOptions["tone"],
                })
              }
              className="advanced-select"
              style={{ width: "100%" }}
            >
              <option value="natural">Natural (Balanced human expression)</option>
              <option value="academic">Academic (Rigorous, formal precision)</option>
              <option value="conversational">Conversational (Warm, approachable)</option>
              <option value="professional">Professional (Executive, clear)</option>
              <option value="casual">Casual (Relaxed, informal phrasing)</option>
            </select>
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: 600,
                color: "#202124",
                marginBottom: "4px",
              }}
            >
              Transformation Intensity
            </label>
            <p style={{ fontSize: "12.5px", color: "#5F6368", marginBottom: "8px" }}>
              Controls the degree of sentence restructuring through language hops.
            </p>
            <select
              value={options.intensity}
              onChange={(e) =>
                onOptionsChange({
                  ...options,
                  intensity: e.target.value as TransformationOptions["intensity"],
                })
              }
              className="advanced-select"
              style={{ width: "100%" }}
            >
              <option value="subtle">Subtle (Preserves closely the original sentence boundaries)</option>
              <option value="balanced">Balanced (Recommended: cleans cliches and refines flow)</option>
              <option value="expressive">Expressive (Deep syntax re-cadencing for organic variety)</option>
            </select>
          </div>

          <div style={{ paddingTop: "8px", borderTop: "1px solid #E8EAED" }}>
            <label className="advanced-checkbox-label">
              <input
                type="checkbox"
                checked={options.preserveFormatting}
                onChange={(e) =>
                  onOptionsChange({
                    ...options,
                    preserveFormatting: e.target.checked,
                  })
                }
                style={{ width: "16px", height: "16px", accentColor: "#1A73E8" }}
              />
              <span style={{ fontSize: "14px", color: "#202124" }}>
                Preserve paragraphs, line breaks and lists
              </span>
            </label>
          </div>

          <div
            style={{
              padding: "12px 14px",
              background: "#F8FAFD",
              border: "1px solid #DADCE0",
              borderRadius: "8px",
              fontSize: "12px",
              color: "#5F6368",
              lineHeight: 1.5,
            }}
          >
            <strong style={{ color: "#202124", display: "block", marginBottom: "4px" }}>
              Keyboard Shortcut
            </strong>
            Press <kbd style={{ padding: "2px 6px", background: "#FFF", border: "1px solid #BDC1C6", borderRadius: "4px" }}>Cmd + Enter</kbd> (Mac) or <kbd style={{ padding: "2px 6px", background: "#FFF", border: "1px solid #BDC1C6", borderRadius: "4px" }}>Ctrl + Enter</kbd> (Windows) inside the editor to immediately trigger humanisation.
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-primary" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
