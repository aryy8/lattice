"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
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
  CloseIcon,
} from "./Icons";
import { SUPPORTED_LANGUAGES, Language } from "@/data/languages";
import { TransformationOptions } from "@/lib/transformer";
import { HistoryEntry } from "./HistoryDrawer";
import { useAuth } from "@/context/AuthContext";

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
  const { user, openAuthModal } = useAuth();
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
  const advancedRef = useRef<HTMLDivElement>(null);

  const hasCustomOptions =
    options.tone !== "natural" ||
    options.intensity !== "balanced" ||
    !options.preserveFormatting;

  // Close advanced options popover on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        advancedRef.current &&
        !advancedRef.current.contains(event.target as Node)
      ) {
        setIsAdvancedOpen(false);
      }
    }
    if (isAdvancedOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAdvancedOpen]);


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

  const runTransformation = useCallback(async () => {
    if (!inputText.trim() || isProcessing) return;

    setIsProcessing(true);
    setCurrentHop(0);

    // Number of translation hops (path has N nodes → N-1 hops)
    const totalHops = path.length - 1;
    // Estimated ms per hop (API delay + 300ms throttle + buffer)
    const msPerHop = 1800;

    // Animate hop progress in parallel while the fetch is running
    let cancelled = false;
    const animateHops = async () => {
      for (let i = 0; i < totalHops; i++) {
        if (cancelled) break;
        setCurrentHop(i + 1);
        const toCode = path[i + 1];
        const lang = SUPPORTED_LANGUAGES.find((l) => l.code === toCode);
        const langName = lang ? lang.name : toCode;
        if (i < totalHops - 1) {
          setHopStatusText(`Step ${i + 1}/${totalHops}: Passing through ${langName}...`);
        } else {
          setHopStatusText(`Step ${i + 1}/${totalHops}: Naturalizing back into ${langName}...`);
        }
        await new Promise((r) => setTimeout(r, msPerHop));
      }
    };
    animateHops();

    try {
      const res = await fetch("/api/transform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText, hops: path }),
      });

      const data = (await res.json()) as { result?: string; error?: string };

      if (!res.ok || data.error) {
        throw new Error(data.error ?? `HTTP ${res.status}`);
      }

      const result = data.result!;
      cancelled = true;
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
      cancelled = true;
      console.error("Transformation failed", err);
      setHopStatusText(err instanceof Error ? `Error: ${err.message}` : "Transformation failed");
    } finally {
      setIsProcessing(false);
      setCurrentHop(null);
      setHopStatusText("");
    }
  }, [inputText, isProcessing, path, onAddHistory]);

  const handleTransform = useCallback(() => {
    if (!inputText.trim() || isProcessing) return;

    // Ask user to log in if not logged in
    if (!user) {
      openAuthModal(() => {
        runTransformation();
      });
      return;
    }

    runTransformation();
  }, [inputText, isProcessing, user, openAuthModal, runTransformation]);

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
  }, [inputText, isProcessing, handleTransform]);

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
                  <div className="output-processing-state">
                    <div className="output-spinner" />
                    <span className="output-status-text">
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

          {/* Card Bottom Controls */}
          <div className="card-bottom-row">
            <div className="advanced-popover-container" ref={advancedRef}>
              <button
                type="button"
                className={`advanced-toggle-btn ${isAdvancedOpen ? "active" : ""}`}
                onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                aria-expanded={isAdvancedOpen}
                aria-haspopup="dialog"
              >
                <TuneIcon size={15} color={isAdvancedOpen ? "var(--primary-blue)" : "var(--text-secondary)"} />
                <span>Advanced options</span>
                {hasCustomOptions && <span className="advanced-active-dot" />}
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    transform: isAdvancedOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                >
                  <ChevronDownIcon size={15} color={isAdvancedOpen ? "var(--primary-blue)" : "var(--text-muted)"} />
                </span>
              </button>

              {isAdvancedOpen && (
                <div className="advanced-popover-modal" role="dialog" aria-label="Advanced options">
                  <div className="advanced-popover-header">
                    <span className="advanced-popover-title">Transformation options</span>
                    <button
                      type="button"
                      className="advanced-popover-close-btn"
                      onClick={() => setIsAdvancedOpen(false)}
                      aria-label="Close options"
                    >
                      <CloseIcon size={15} />
                    </button>
                  </div>

                  <div className="advanced-popover-body">
                    <div className="advanced-item">
                      <label className="advanced-label">Cadence &amp; Tone</label>
                      <div className="adv-pill-group">
                        {([
                          { value: "natural", label: "Natural" },
                          { value: "academic", label: "Academic" },
                          { value: "conversational", label: "Conversational" },
                          { value: "professional", label: "Professional" },
                          { value: "casual", label: "Casual" },
                        ] as { value: TransformationOptions["tone"]; label: string }[]).map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            className={`adv-pill${options.tone === opt.value ? " adv-pill--active" : ""}`}
                            onClick={() => onOptionsChange({ ...options, tone: opt.value })}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="advanced-item">
                      <label className="advanced-label">Transformation Intensity</label>
                      <div className="adv-segment">
                        {([
                          { value: "subtle", label: "Subtle" },
                          { value: "balanced", label: "Balanced" },
                          { value: "expressive", label: "Expressive" },
                        ] as { value: TransformationOptions["intensity"]; label: string }[]).map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            className={`adv-seg-btn${options.intensity === opt.value ? " adv-seg-btn--active" : ""}`}
                            onClick={() => onOptionsChange({ ...options, intensity: opt.value })}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="advanced-item">
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
                          style={{ width: "15px", height: "15px", accentColor: "var(--primary-blue)" }}
                        />
                        <span>Preserve paragraphs & lists</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

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
