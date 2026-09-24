"use client";

import React, { useState, useEffect, useRef } from "react";
import { Flag } from "./Flags";
import { LanguageDropdown } from "./LanguageDropdown";
import { EditPathModal } from "./EditPathModal";
import {
  TrashIcon,
  CopyIcon,
  CheckIcon,
  SwapHorizontalIcon,
  TuneIcon,
  ChevronDownIcon,
  ArrowRightIcon,
} from "./Icons";
import { SUPPORTED_LANGUAGES, SAMPLE_PROMPTS, Language } from "@/data/languages";
import { humaniseText, TransformationOptions } from "@/lib/transformer";
import { HistoryEntry } from "./HistoryDrawer";

interface LatticeToolProps {
  onAddHistory: (entry: HistoryEntry) => void;
  options: TransformationOptions;
  onOptionsChange: (opts: TransformationOptions) => void;
  inputRef?: React.RefObject<HTMLTextAreaElement | null>;
}

export function LatticeTool({
  onAddHistory,
  options,
  onOptionsChange,
  inputRef,
}: LatticeToolProps) {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [inputLang, setInputLang] = useState("en");
  const [outputLang, setOutputLang] = useState("en");

  // Default path matching Reference 2: English -> Spanish -> German -> Japanese -> English
  const [path, setPath] = useState<string[]>(["en", "es", "de", "ja", "en"]);
  const [isEditPathOpen, setIsEditPathOpen] = useState(false);

  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentHop, setCurrentHop] = useState<number | null>(null);
  const [hopStatusText, setHopStatusText] = useState("");
  const [copied, setCopied] = useState(false);

  const internalInputRef = useRef<HTMLTextAreaElement>(null);
  const textareaRef = inputRef || internalInputRef;

  // Handle keyboard shortcut (Cmd/Ctrl + Enter)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        if (!isProcessing && inputText.trim()) {
          handleTransform();
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inputText, isProcessing, path, options]);

  // Keep path start/end in sync with inputLang and outputLang
  const handleInputLangChange = (lang: Language) => {
    setInputLang(lang.code);
    setPath((prev) => {
      const copy = [...prev];
      copy[0] = lang.code;
      return copy;
    });
  };

  const handleOutputLangChange = (lang: Language) => {
    setOutputLang(lang.code);
    setPath((prev) => {
      const copy = [...prev];
      copy[copy.length - 1] = lang.code;
      return copy;
    });
  };

  const handleSwap = () => {
    const tempText = inputText;
    setInputText(outputText);
    setOutputText(tempText);

    const tempLang = inputLang;
    setInputLang(outputLang);
    setOutputLang(tempLang);

    // Reverse intermediate path
    setPath((prev) => {
      const reversed = [...prev].reverse();
      return reversed;
    });
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
    setCurrentHop(null);
    setHopStatusText("");
  };

  const handleCopy = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleTransform = async () => {
    if (!inputText.trim() || isProcessing) return;

    setIsProcessing(true);
    setCurrentHop(0);

    try {
      const result = await humaniseText(
        inputText,
        path,
        options,
        (step, total, code) => {
          setCurrentHop(step);
          const lang = SUPPORTED_LANGUAGES.find((l) => l.code === code);
          const langName = lang ? lang.name : code;
          if (step < total) {
            setHopStatusText(`Step ${step}/${total}: Passing through ${langName}...`);
          } else {
            setHopStatusText(`Step ${step}/${total}: Naturalizing back into ${langName}...`);
          }
        }
      );

      setOutputText(result);

      // Save to history
      const pathNames = path.map((code) => {
        const l = SUPPORTED_LANGUAGES.find((x) => x.code === code);
        return l ? l.name : code;
      });

      onAddHistory({
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        originalText: inputText,
        transformedText: result,
        pathNames,
      });
    } catch (err) {
      console.error("Transformation failed", err);
    } finally {
      setIsProcessing(false);
      setCurrentHop(null);
      setHopStatusText("");
    }
  };

  const handleApplyPresetPrompt = (sampleText: string) => {
    setInputText(sampleText);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handlePathHopChange = (index: number, lang: Language) => {
    setPath((prev) => {
      const copy = [...prev];
      copy[index] = lang.code;
      if (index === 0) setInputLang(lang.code);
      if (index === copy.length - 1) setOutputLang(lang.code);
      return copy;
    });
  };

  return (
    <section className="tool-section">
      <div className="lattice-container">
        <div className="tool-card" id="lattice-product-tool">
          {/* Upper Section: Two Columns (Input & Output) */}
          <div className="editor-grid">
            {/* Input Column */}
            <div className="editor-column">
              <div className="column-header">
                <div className="column-title-stack">
                  <span className="column-label">Input language</span>
                  <LanguageDropdown
                    selectedCode={inputLang}
                    onSelect={handleInputLangChange}
                  />
                </div>
              </div>

              <div className="editor-box input-box">
                <textarea
                  ref={textareaRef}
                  className="editor-textarea"
                  placeholder="Paste or type your text here..."
                  value={inputText}
                  maxLength={5000}
                  onChange={(e) => setInputText(e.target.value)}
                />

                <div className="box-bottom-bar">
                  <span className="char-counter">
                    {inputText.length} / 5000
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Swap button between columns */}
            <div className="swap-button-container">
              <button
                type="button"
                className="swap-circle-btn"
                onClick={handleSwap}
                title="Swap input and output languages"
              >
                <SwapHorizontalIcon size={18} color="#1A73E8" />
              </button>
            </div>

            {/* Output Column */}
            <div className="editor-column">
              <div className="column-header">
                <div className="column-title-stack">
                  <span className="column-label">Output language</span>
                  <LanguageDropdown
                    selectedCode={outputLang}
                    onSelect={handleOutputLangChange}
                  />
                </div>

                <button
                  type="button"
                  className="clear-btn"
                  onClick={handleClear}
                  disabled={!inputText && !outputText}
                  style={{ opacity: !inputText && !outputText ? 0.4 : 1 }}
                >
                  <TrashIcon size={16} />
                  <span>Clear</span>
                </button>
              </div>

              <div className="editor-box output-box">
                {isProcessing ? (
                  <div
                    style={{
                      height: "215px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "14px",
                      color: "#1A73E8",
                    }}
                  >
                    <div
                      style={{
                        width: "28px",
                        height: "28px",
                        border: "3px solid #D2E3FC",
                        borderTopColor: "#1A73E8",
                        borderRadius: "50%",
                        animation: "spin 0.8s linear infinite",
                      }}
                    />
                    <style>{`
                      @keyframes spin {
                        to { transform: rotate(360deg); }
                      }
                    `}</style>
                    <span style={{ fontSize: "14px", color: "#5F6368" }}>
                      {hopStatusText || "Processing text through linguistic path..."}
                    </span>
                  </div>
                ) : outputText ? (
                  <div className="output-content">{outputText}</div>
                ) : (
                  <div className="output-content output-placeholder">
                    Your transformed text will appear here...
                  </div>
                )}

                <div className="box-bottom-bar">
                  <span className="char-counter">
                    {outputText ? `${outputText.split(/\s+/).filter(Boolean).length} words` : ""}
                  </span>

                  <button
                    type="button"
                    className={`copy-btn ${copied ? "copied" : ""}`}
                    onClick={handleCopy}
                    disabled={!outputText || isProcessing}
                    style={{ opacity: !outputText ? 0.4 : 1 }}
                  >
                    {copied ? (
                      <>
                        <CheckIcon size={16} />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <CopyIcon size={16} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Language Path Area */}
          <div className="path-section">
            <div className="path-label">Language path</div>

            <div className="path-row">
              <div className="path-chain">
                {path.map((code, idx) => {
                  const lang =
                    SUPPORTED_LANGUAGES.find((l) => l.code === code) ||
                    SUPPORTED_LANGUAGES[0];
                  const isActiveHop = currentHop === idx;

                  return (
                    <React.Fragment key={`${code}-${idx}`}>
                      <LanguageDropdown
                        selectedCode={code}
                        onSelect={(newLang) => handlePathHopChange(idx, newLang)}
                        buttonClassName={`path-chip ${isActiveHop ? "active-hop" : ""}`}
                      />

                      {idx < path.length - 1 && (
                        <span className="path-arrow">
                          <ArrowRightIcon size={14} color="#70757A" />
                        </span>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              <button
                type="button"
                className="edit-path-btn"
                onClick={() => setIsEditPathOpen(true)}
              >
                <TuneIcon size={16} color="#1A73E8" />
                <span>Edit path</span>
              </button>
            </div>
          </div>

          {/* Advanced Options Accordion Panel */}
          {isAdvancedOpen && (
            <div className="advanced-panel">
              <div className="advanced-item">
                <label className="advanced-label">Cadence & Tone</label>
                <select
                  value={options.tone}
                  onChange={(e) =>
                    onOptionsChange({
                      ...options,
                      tone: e.target.value as TransformationOptions["tone"],
                    })
                  }
                  className="advanced-select"
                >
                  <option value="natural">Natural (Recommended)</option>
                  <option value="academic">Academic & Formal</option>
                  <option value="conversational">Conversational</option>
                  <option value="professional">Professional</option>
                  <option value="casual">Casual & Relaxed</option>
                </select>
              </div>

              <div className="advanced-item">
                <label className="advanced-label">Transformation Intensity</label>
                <select
                  value={options.intensity}
                  onChange={(e) =>
                    onOptionsChange({
                      ...options,
                      intensity: e.target.value as TransformationOptions["intensity"],
                    })
                  }
                  className="advanced-select"
                >
                  <option value="subtle">Subtle</option>
                  <option value="balanced">Balanced (Default)</option>
                  <option value="expressive">Expressive</option>
                </select>
              </div>

              <div className="advanced-item">
                <label className="advanced-label">Formatting</label>
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
                  <span>Preserve paragraphs & lists</span>
                </label>
              </div>
            </div>
          )}

          {/* Card Bottom Controls */}
          <div className="card-bottom-row">
            <button
              type="button"
              className="advanced-toggle-btn"
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            >
              <span
                style={{
                  display: "inline-block",
                  transform: isAdvancedOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                }}
              >
                <ChevronDownIcon size={16} color="#5F6368" />
              </span>
              <span>Advanced options</span>
            </button>

            <button
              type="button"
              className="primary-action-btn"
              onClick={handleTransform}
              disabled={!inputText.trim() || isProcessing}
            >
              <span>{isProcessing ? "Transforming..." : "Transform"}</span>
              <ArrowRightIcon size={16} color="#FFFFFF" />
            </button>
          </div>
        </div>
      </div>

      {/* Edit Path Modal */}
      <EditPathModal
        isOpen={isEditPathOpen}
        onClose={() => setIsEditPathOpen(false)}
        currentPath={path}
        onSave={(newPath) => {
          setPath(newPath);
          setInputLang(newPath[0]);
          setOutputLang(newPath[newPath.length - 1]);
        }}
      />
    </section>
  );
}
