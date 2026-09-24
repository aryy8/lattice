"use client";

import React, { useState, useRef, useEffect } from "react";
import { LatticeLogo, HistoryIcon, SettingsIcon, AppsGridIcon } from "./Icons";

interface NavigationProps {
  onOpenHistory: () => void;
  onOpenSettings: () => void;
  historyCount: number;
}

export function Navigation({
  onOpenHistory,
  onOpenSettings,
  historyCount,
}: NavigationProps) {
  const [showAppsMenu, setShowAppsMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const appsRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (appsRef.current && !appsRef.current.contains(event.target as Node)) {
        setShowAppsMenu(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="top-nav-wrapper">
      <header className="top-nav">
        {/* Brand */}
        <a href="#" className="nav-brand">
          <LatticeLogo size={30} />
          <span className="brand-wordmark">Lattice</span>
        </a>

        {/* Right controls */}
        <div className="nav-actions">
        <button
          type="button"
          onClick={onOpenHistory}
          className="nav-btn"
          title="Transformation history"
        >
          <HistoryIcon size={19} color="#5F6368" />
          <span>History</span>
          {historyCount > 0 && (
            <span
              style={{
                fontSize: "11px",
                background: "#E8F0FE",
                color: "#1A73E8",
                fontWeight: 600,
                padding: "1px 6px",
                borderRadius: "10px",
              }}
            >
              {historyCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={onOpenSettings}
          className="nav-btn"
          title="Preferences & settings"
        >
          <SettingsIcon size={19} color="#5F6368" />
          <span>Settings</span>
        </button>

        {/* Google-style Apps Grid Launcher */}
        <div ref={appsRef} style={{ position: "relative" }}>
          <button
            type="button"
            className="nav-icon-btn"
            title="Google & Lattice Apps"
            onClick={() => setShowAppsMenu(!showAppsMenu)}
          >
            <AppsGridIcon size={20} color="#5F6368" />
          </button>

          {showAppsMenu && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                right: 0,
                width: "280px",
                background: "#FFFFFF",
                border: "1px solid #DADCE0",
                borderRadius: "14px",
                boxShadow: "0 4px 20px rgba(60, 64, 67, 0.18)",
                padding: "16px",
                zIndex: 60,
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "12px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F8F9FA")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <LatticeLogo size={24} />
                <span style={{ fontSize: "11.5px", color: "#202124", fontWeight: 500 }}>
                  Lattice
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F8F9FA")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "6px",
                    background: "#E8F0FE",
                    color: "#1A73E8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  文A
                </div>
                <span style={{ fontSize: "11.5px", color: "#202124" }}>
                  Translate
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F8F9FA")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "6px",
                    background: "#FEF7E0",
                    color: "#EA8600",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  Labs
                </div>
                <span style={{ fontSize: "11.5px", color: "#202124" }}>
                  Labs
                </span>
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div ref={userRef} style={{ position: "relative" }}>
          <button
            type="button"
            className="user-avatar"
            title="Account"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            A
          </button>

          {showUserMenu && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                right: 0,
                width: "220px",
                background: "#FFFFFF",
                border: "1px solid #DADCE0",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(60, 64, 67, 0.18)",
                padding: "12px 0",
                zIndex: 60,
              }}
            >
              <div style={{ padding: "8px 16px", borderBottom: "1px solid #E8EAED" }}>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "#202124" }}>
                  Aryan
                </p>
                <p style={{ fontSize: "11.5px", color: "#5F6368" }}>
                  aryan@google.internal
                </p>
              </div>
              <div style={{ padding: "4px 0" }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowUserMenu(false);
                    onOpenSettings();
                  }}
                  style={{
                    width: "100%",
                    padding: "8px 16px",
                    textAlign: "left",
                    fontSize: "13px",
                    color: "#202124",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F8F9FA")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  Preferences
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowUserMenu(false);
                    onOpenHistory();
                  }}
                  style={{
                    width: "100%",
                    padding: "8px 16px",
                    textAlign: "left",
                    fontSize: "13px",
                    color: "#202124",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F8F9FA")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  History
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  </div>
);
}
