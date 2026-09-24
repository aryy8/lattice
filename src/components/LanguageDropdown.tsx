"use client";

import React, { useState, useRef, useEffect } from "react";
import { SUPPORTED_LANGUAGES, Language } from "@/data/languages";
import { Flag } from "./Flags";
import { ChevronDownIcon } from "./Icons";

interface LanguageDropdownProps {
  selectedCode: string;
  onSelect: (lang: Language) => void;
  showFlag?: boolean;
  className?: string;
  buttonClassName?: string;
}

export function LanguageDropdown({
  selectedCode,
  onSelect,
  showFlag = true,
  className = "",
  buttonClassName = "",
}: LanguageDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLang =
    SUPPORTED_LANGUAGES.find((l) => l.code === selectedCode) ||
    SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const filteredLanguages = SUPPORTED_LANGUAGES.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      ref={dropdownRef}
      style={{ position: "relative", display: "inline-block" }}
      className={className}
    >
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          setSearch("");
        }}
        className={buttonClassName || "lang-selector-trigger"}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {showFlag && <Flag code={selectedLang.flag} size={18} />}
        <span>{selectedLang.name}</span>
        <ChevronDownIcon size={14} color="#5F6368" />
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            zIndex: 50,
            background: "#FFFFFF",
            border: "1px solid #DADCE0",
            borderRadius: "10px",
            boxShadow: "0 4px 16px rgba(60, 64, 67, 0.15)",
            width: "220px",
            maxHeight: "300px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
          role="listbox"
        >
          <div style={{ padding: "8px 10px", borderBottom: "1px solid #E8EAED" }}>
            <input
              type="text"
              placeholder="Search language..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              style={{
                width: "100%",
                padding: "6px 10px",
                fontSize: "13px",
                border: "1px solid #DADCE0",
                borderRadius: "6px",
                outline: "none",
              }}
            />
          </div>

          <div style={{ overflowY: "auto", flex: 1, padding: "4px 0" }}>
            {filteredLanguages.length === 0 ? (
              <div
                style={{
                  padding: "10px 14px",
                  fontSize: "13px",
                  color: "#80868B",
                }}
              >
                No language found
              </div>
            ) : (
              filteredLanguages.map((lang) => {
                const isSelected = lang.code === selectedCode;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      onSelect(lang);
                      setIsOpen(false);
                    }}
                    style={{
                      width: "100%",
                      padding: "8px 14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "13.5px",
                      textAlign: "left",
                      color: isSelected ? "#1A73E8" : "#202124",
                      backgroundColor: isSelected ? "#E8F0FE" : "transparent",
                      cursor: "pointer",
                      transition: "background 0.1s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = "#F8F9FA";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }
                    }}
                  >
                    <Flag code={lang.flag} size={18} />
                    <span style={{ fontWeight: isSelected ? 600 : 400 }}>
                      {lang.name}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
