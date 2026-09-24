"use client";

import React, { useState } from "react";
import { SUPPORTED_LANGUAGES, PATH_PRESETS, Language } from "@/data/languages";
import { Flag } from "./Flags";
import { CloseIcon, PlusIcon, TrashIcon } from "./Icons";

interface EditPathModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string[]; // array of language codes
  onSave: (newPath: string[]) => void;
}

export function EditPathModal({
  isOpen,
  onClose,
  currentPath,
  onSave,
}: EditPathModalProps) {
  const [path, setPath] = useState<string[]>(currentPath);
  const [selectedToAdd, setSelectedToAdd] = useState<string>("fr");

  if (!isOpen) return null;

  const handleApplyPreset = (presetPath: string[]) => {
    setPath([...presetPath]);
  };

  const handleRemoveHop = (index: number) => {
    // Keep at least start, one intermediary, and end
    if (path.length <= 3) return;
    const newPath = path.filter((_, i) => i !== index);
    setPath(newPath);
  };

  const handleAddHop = () => {
    // Insert before the final target language
    const newPath = [...path];
    newPath.splice(newPath.length - 1, 0, selectedToAdd);
    setPath(newPath);
  };

  const handleHopLanguageChange = (index: number, newCode: string) => {
    const newPath = [...path];
    newPath[index] = newCode;
    setPath(newPath);
  };

  const handleSave = () => {
    onSave(path);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Configure Language Path</h3>
          <button
            type="button"
            onClick={onClose}
            style={{
              color: "#5F6368",
              display: "flex",
              alignItems: "center",
              padding: "4px",
              borderRadius: "50%",
            }}
          >
            <CloseIcon size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Presets */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                color: "#5F6368",
                marginBottom: "8px",
              }}
            >
              Recommended Presets
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {PATH_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleApplyPreset(preset.path)}
                  style={{
                    fontSize: "12.5px",
                    fontWeight: 500,
                    padding: "6px 12px",
                    background: "#F1F4F9",
                    border: "1px solid #DADCE0",
                    borderRadius: "20px",
                    color: "#202124",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#E8F0FE";
                    e.currentTarget.style.borderColor = "#D2E3FC";
                    e.currentTarget.style.color = "#1A73E8";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#F1F4F9";
                    e.currentTarget.style.borderColor = "#DADCE0";
                    e.currentTarget.style.color = "#202124";
                  }}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Current Path Sequence */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                color: "#5F6368",
                marginBottom: "10px",
              }}
            >
              Transformation Sequence ({path.length - 1} Hops)
            </label>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {path.map((code, idx) => {
                const lang =
                  SUPPORTED_LANGUAGES.find((l) => l.code === code) ||
                  SUPPORTED_LANGUAGES[0];
                const isStart = idx === 0;
                const isEnd = idx === path.length - 1;
                const isIntermediate = !isStart && !isEnd;

                return (
                  <div
                    key={`${code}-${idx}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 12px",
                      background: isStart || isEnd ? "#F8FAFD" : "#FFFFFF",
                      border: "1px solid #DADCE0",
                      borderRadius: "8px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "#5F6368",
                          width: "48px",
                        }}
                      >
                        {isStart ? "START" : isEnd ? "RETURN" : `HOP ${idx}`}
                      </span>
                      <Flag code={lang.flag} size={18} />
                      <select
                        value={code}
                        onChange={(e) => handleHopLanguageChange(idx, e.target.value)}
                        style={{
                          fontSize: "13.5px",
                          fontWeight: 500,
                          color: "#202124",
                          border: "none",
                          background: "transparent",
                          cursor: "pointer",
                          outline: "none",
                        }}
                      >
                        {SUPPORTED_LANGUAGES.map((l) => (
                          <option key={l.code} value={l.code}>
                            {l.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {isIntermediate && (
                      <button
                        type="button"
                        onClick={() => handleRemoveHop(idx)}
                        disabled={path.length <= 3}
                        title="Remove hop"
                        style={{
                          color: path.length <= 3 ? "#BDC1C6" : "#5F6368",
                          padding: "4px",
                          borderRadius: "4px",
                          display: "flex",
                          alignItems: "center",
                          cursor: path.length <= 3 ? "not-allowed" : "pointer",
                        }}
                      >
                        <TrashIcon size={16} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Add language hop */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 14px",
              background: "#F8FAFD",
              border: "1px dashed #DADCE0",
              borderRadius: "8px",
            }}
          >
            <span style={{ fontSize: "13px", color: "#5F6368" }}>Add intermediate hop:</span>
            <select
              value={selectedToAdd}
              onChange={(e) => setSelectedToAdd(e.target.value)}
              style={{
                fontSize: "13px",
                padding: "4px 8px",
                border: "1px solid #DADCE0",
                borderRadius: "6px",
                background: "#FFF",
              }}
            >
              {SUPPORTED_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleAddHop}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "13px",
                fontWeight: 500,
                color: "#1A73E8",
                padding: "5px 10px",
                borderRadius: "6px",
                background: "#E8F0FE",
              }}
            >
              <PlusIcon size={14} />
              Add to path
            </button>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="btn-primary" onClick={handleSave}>
            Apply Path
          </button>
        </div>
      </div>
    </div>
  );
}
