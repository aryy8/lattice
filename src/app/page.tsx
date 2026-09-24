"use client";

import React, { useState, useRef, useEffect } from "react";
import { HeroWaves } from "@/components/HeroWaves";
import { Navigation } from "@/components/Navigation";
import { LatticeTool } from "@/components/LatticeTool";
import { ExplainerSection } from "@/components/ExplainerSection";
import { HowItWorks } from "@/components/HowItWorks";
import { UseCases } from "@/components/UseCases";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { HistoryDrawer, HistoryEntry } from "@/components/HistoryDrawer";
import { SettingsModal } from "@/components/SettingsModal";
import { TransformationOptions } from "@/lib/transformer";

export default function Home() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [options, setOptions] = useState<TransformationOptions>({
    tone: "natural",
    intensity: "balanced",
    preserveFormatting: true,
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load history from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem("lattice_history");
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch {
      // Ignore
    }
  }, []);

  const handleAddHistory = (entry: HistoryEntry) => {
    setHistory((prev) => {
      const updated = [entry, ...prev.slice(0, 24)];
      try {
        localStorage.setItem("lattice_history", JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem("lattice_history");
    } catch {
      // Ignore
    }
  };

  const handleSelectHistoryEntry = (entry: HistoryEntry) => {
    if (textareaRef.current) {
      textareaRef.current.value = entry.originalText;
      textareaRef.current.dispatchEvent(new Event("input", { bubbles: true }));
      textareaRef.current.focus();
    }
  };

  const handleScrollToTool = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 400);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* 1. Hero Section: Top Navigation + Product Tool with vibrant silky background waves */}
      <div className="hero-wrapper">
        <HeroWaves />
        <div className="hero-content">
          <Navigation
            onOpenHistory={() => setIsHistoryOpen(true)}
            onOpenSettings={() => setIsSettingsOpen(true)}
            historyCount={history.length}
          />

          <LatticeTool
            onAddHistory={handleAddHistory}
            options={options}
            onOptionsChange={setOptions}
            inputRef={textareaRef}
          />
        </div>
      </div>

      {/* Main Page Flow: Different section-by-section background matching Reference 2 */}
      <main style={{ flex: 1 }}>
        {/* 2. Explanation of what Lattice does & Visual diagram & Benefits (Crisp White) */}
        <ExplainerSection />

        {/* 3. Visual explanation of the language-path mechanism (How It Works on White) */}
        <HowItWorks />

        {/* 4. Use Cases (Clean Cards on White) */}
        <UseCases />

        {/* 5. Final CTA (Soft Pale-Blue Gradient with Curved Dots) */}
        <FinalCta onTryLattice={handleScrollToTool} />
      </main>

      {/* 6. Footer */}
      <Footer onTryLattice={handleScrollToTool} />

      {/* History Slide-over Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectEntry={handleSelectHistoryEntry}
        onClearHistory={handleClearHistory}
      />

      {/* Settings Dialog */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        options={options}
        onOptionsChange={setOptions}
      />
    </div>
  );
}
