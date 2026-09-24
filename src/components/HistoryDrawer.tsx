"use client";

import React from "react";
import { CloseIcon, TrashIcon, ArrowRightIcon } from "./Icons";

export interface HistoryEntry {
  id: string;
  timestamp: string;
  originalText: string;
  transformedText: string;
  pathNames: string[];
}

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryEntry[];
  onSelectEntry: (entry: HistoryEntry) => void;
  onClearHistory: () => void;
}

export function HistoryDrawer({
  isOpen,
  onClose,
  history,
  onSelectEntry,
  onClearHistory,
}: HistoryDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 90 }}>
      <div className="history-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <h3 className="modal-title">Transformation History</h3>
            <span
              style={{
                fontSize: "12px",
                background: "#E8F0FE",
                color: "#1A73E8",
                fontWeight: 600,
                padding: "2px 8px",
                borderRadius: "10px",
              }}
            >
              {history.length}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {history.length > 0 && (
              <button
                type="button"
                onClick={onClearHistory}
                title="Clear all history"
                style={{
                  color: "#5F6368",
                  padding: "6px",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TrashIcon size={18} />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              style={{
                color: "#5F6368",
                padding: "6px",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <CloseIcon size={18} />
            </button>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto" }}>
          {history.length === 0 ? (
            <div
              style={{
                padding: "48px 24px",
                textAlign: "center",
                color: "#80868B",
              }}
            >
              <p style={{ fontSize: "14px", marginBottom: "8px" }}>
                No transformation history yet.
              </p>
              <p style={{ fontSize: "12.5px" }}>
                Humanised text outputs will be saved here automatically during your session.
              </p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className="history-item"
                onClick={() => {
                  onSelectEntry(item);
                  onClose();
                }}
                style={{ cursor: "pointer" }}
              >
                <div className="history-meta">
                  <span>{item.timestamp}</span>
                  <span style={{ fontSize: "11px", color: "#1A73E8" }}>
                    {item.pathNames.join(" → ")}
                  </span>
                </div>
                <div
                  className="history-text-preview"
                  title={item.transformedText}
                >
                  {item.transformedText}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "12px",
                    color: "#5F6368",
                  }}
                >
                  <span>{item.originalText.length} chars</span>
                  <span
                    style={{
                      color: "#1A73E8",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontWeight: 500,
                    }}
                  >
                    Load into editor <ArrowRightIcon size={12} />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
