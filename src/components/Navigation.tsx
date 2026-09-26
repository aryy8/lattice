"use client";

import React, { useState, useRef, useEffect } from "react";
import { LatticeLogo, HistoryIcon, SettingsIcon, AppsGridIcon } from "./Icons";
import { useAuth } from "@/context/AuthContext";

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
  const { user, openAuthModal, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [showAppsMenu, setShowAppsMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const appsRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
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

  const getInitial = () => {
    if (user?.name) return user.name.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return "U";
  };

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

          {/* User Auth Section */}
          {!mounted || !user ? (
            <button
              type="button"
              onClick={() => openAuthModal()}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 16px",
                height: "36px",
                borderRadius: "18px",
                backgroundColor: "#1A73E8",
                color: "#FFFFFF",
                fontSize: "13.5px",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 1px 3px rgba(26, 115, 232, 0.3)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1557B0")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1A73E8")}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 15.907 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
              </svg>
              <span>Sign in</span>
            </button>
          ) : (
            <div ref={userRef} style={{ position: "relative" }}>
              <button
                type="button"
                className="user-avatar"
                title={`Logged in as ${user.name || user.email}`}
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{
                  padding: 0,
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {user.picture ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={user.picture}
                    alt={user.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  getInitial()
                )}
              </button>

              {showUserMenu && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    right: 0,
                    width: "240px",
                    background: "#FFFFFF",
                    border: "1px solid #DADCE0",
                    borderRadius: "14px",
                    boxShadow: "0 4px 24px rgba(60, 64, 67, 0.18)",
                    padding: "14px 0",
                    zIndex: 60,
                  }}
                >
                  <div style={{ padding: "8px 16px 12px 16px", borderBottom: "1px solid #E8EAED" }}>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#202124", margin: "0 0 2px 0" }}>
                      {user.name}
                    </p>
                    <p style={{ fontSize: "12px", color: "#5F6368", margin: 0, wordBreak: "break-all" }}>
                      {user.email}
                    </p>
                    <span
                      style={{
                        display: "inline-block",
                        fontSize: "10px",
                        fontWeight: 600,
                        color: "#1A73E8",
                        background: "#E8F0FE",
                        padding: "2px 8px",
                        borderRadius: "10px",
                        marginTop: "6px",
                      }}
                    >
                      Google Verified Account
                    </span>
                  </div>
                  <div style={{ padding: "6px 0 0 0" }}>
                    <button
                      type="button"
                      onClick={() => {
                        setShowUserMenu(false);
                        onOpenSettings();
                      }}
                      style={{
                        width: "100%",
                        padding: "9px 16px",
                        textAlign: "left",
                        fontSize: "13px",
                        color: "#202124",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
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
                        padding: "9px 16px",
                        textAlign: "left",
                        fontSize: "13px",
                        color: "#202124",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F8F9FA")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                      History
                    </button>
                    <div style={{ borderTop: "1px solid #E8EAED", marginTop: "4px", paddingTop: "4px" }}>
                      <button
                        type="button"
                        onClick={() => {
                          setShowUserMenu(false);
                          logout();
                        }}
                        style={{
                          width: "100%",
                          padding: "9px 16px",
                          textAlign: "left",
                          fontSize: "13px",
                          color: "#D93025",
                          fontWeight: 500,
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FCE8E6")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
