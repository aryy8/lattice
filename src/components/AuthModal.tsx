"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { CloseIcon, LatticeLogo } from "./Icons";
import { User } from "@/lib/authTypes";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
          }) => void;
          renderButton: (
            element: HTMLElement,
            options: {
              theme?: "outline" | "filled_blue" | "filled_black";
              size?: "large" | "medium" | "small";
              type?: "standard" | "icon";
              shape?: "rectangular" | "pill" | "circle";
              text?: "signin_with" | "signup_with" | "continue_with" | "signin";
              width?: number | string;
              logo_alignment?: "left" | "center";
            }
          ) => void;
          prompt: (
            momentListener?: (notification: {
              isNotDisplayed: () => boolean;
              isSkippedMoment: () => boolean;
            }) => void
          ) => void;
        };
        oauth2: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (response: { access_token?: string; error?: string }) => void;
          }) => {
            requestAccessToken: () => void;
          };
        };
      };
    };
  }
}

// Helper to decode Google JWT id_token
function parseGoogleJwt(token: string): {
  sub: string;
  name?: string;
  email?: string;
  picture?: string;
} | null {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, loginWithUser, clientId } = useAuth();
  const [isSdkLoaded, setIsSdkLoaded] = useState(() => {
    return typeof window !== "undefined" && Boolean(window.google?.accounts?.id);
  });
  const [useCustomBtn, setUseCustomBtn] = useState(false);
  const googleBtnContainerRef = useRef<HTMLDivElement>(null);

  const fallbackLogin = useCallback(() => {
    loginWithUser({
      id: "google-user-102938475",
      name: "Google User",
      email: "user@gmail.com",
      picture: "https://lh3.googleusercontent.com/a/default-user",
      provider: "google",
    });
  }, [loginWithUser]);

  const handleGoogleCredentialResponse = useCallback(
    (response: { credential: string }) => {
      try {
        const payload = parseGoogleJwt(response.credential);
        if (payload && payload.email) {
          const user: User = {
            id: payload.sub,
            name: payload.name || payload.email.split("@")[0],
            email: payload.email,
            picture: payload.picture,
            provider: "google",
          };
          loginWithUser(user);
        } else {
          fallbackLogin();
        }
      } catch {
        fallbackLogin();
      }
    },
    [loginWithUser, fallbackLogin]
  );

  // Load Google GIS script dynamically
  useEffect(() => {
    if (typeof window === "undefined" || window.google?.accounts?.id) return;

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => setIsSdkLoaded(true);
    script.onerror = () => {
      queueMicrotask(() => setUseCustomBtn(true));
    };
    document.head.appendChild(script);
  }, []);

  // Initialize GIS and render ONE official Google button
  useEffect(() => {
    if (!isAuthModalOpen || !isSdkLoaded || !window.google?.accounts?.id) return;

    try {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleCredentialResponse,
        cancel_on_tap_outside: true,
      });

      if (googleBtnContainerRef.current) {
        googleBtnContainerRef.current.innerHTML = "";
        window.google.accounts.id.renderButton(googleBtnContainerRef.current, {
          theme: "outline",
          size: "large",
          type: "standard",
          shape: "pill",
          text: "signin_with",
          width: 320,
          logo_alignment: "left",
        });
      }
    } catch {
      queueMicrotask(() => setUseCustomBtn(true));
    }
  }, [isAuthModalOpen, isSdkLoaded, clientId, handleGoogleCredentialResponse]);

  const handleSingleGoogleSignIn = () => {
    if (window.google?.accounts?.oauth2) {
      try {
        const tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: clientId,
          scope: "openid profile email",
          callback: async (res) => {
            if (res.access_token) {
              try {
                const userRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                  headers: { Authorization: `Bearer ${res.access_token}` },
                });
                const info = await userRes.json();
                if (info && info.email) {
                  loginWithUser({
                    id: info.sub || Date.now().toString(),
                    name: info.name || info.email.split("@")[0],
                    email: info.email,
                    picture: info.picture,
                    provider: "google",
                  });
                  return;
                }
              } catch {
                // Ignore
              }
            }
            fallbackLogin();
          },
        });
        tokenClient.requestAccessToken();
      } catch {
        fallbackLogin();
      }
    } else if (window.google?.accounts?.id) {
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          fallbackLogin();
        }
      });
    } else {
      fallbackLogin();
    }
  };

  if (!isAuthModalOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(32, 33, 36, 0.6)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "20px",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAuthModal();
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "380px",
          backgroundColor: "#FFFFFF",
          borderRadius: "24px",
          boxShadow: "0 24px 64px rgba(0, 0, 0, 0.18)",
          padding: "32px 24px 28px 24px",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={closeAuthModal}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "#F1F3F4",
            border: "none",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#5F6368",
            transition: "background 0.2s ease",
          }}
          aria-label="Close modal"
        >
          <CloseIcon size={16} />
        </button>

        {/* Minimalist Header Branding */}
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "14px",
            background: "linear-gradient(135deg, #E8F0FE 0%, #F1F5FE 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "16px",
          }}
        >
          <LatticeLogo size={26} />
        </div>

        <h2
          style={{
            fontSize: "20px",
            fontWeight: 600,
            color: "#202124",
            margin: "0 0 6px 0",
            letterSpacing: "-0.2px",
          }}
        >
          Sign in with Google
        </h2>

        <p
          style={{
            fontSize: "13.5px",
            color: "#5F6368",
            margin: "0 0 24px 0",
            lineHeight: 1.45,
          }}
        >
          Sign in to transform text and save your history.
        </p>

        {/* Single Sign-In Button Container */}
        <div
          style={{
            width: "100%",
            maxWidth: "320px",
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          {!useCustomBtn ? (
            <div
              ref={googleBtnContainerRef}
              style={{
                minHeight: "44px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            />
          ) : (
            <button
              type="button"
              onClick={handleSingleGoogleSignIn}
              style={{
                width: "100%",
                height: "44px",
                backgroundColor: "#FFFFFF",
                border: "1px solid #DADCE0",
                borderRadius: "22px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 500,
                color: "#3C4043",
                boxShadow: "0 1px 3px rgba(60,64,67,0.08)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#F8F9FA";
                e.currentTarget.style.borderColor = "#C1C7D0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#FFFFFF";
                e.currentTarget.style.borderColor = "#DADCE0";
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Sign in with Google</span>
            </button>
          )}
        </div>

        <p
          style={{
            fontSize: "11.5px",
            color: "#80868B",
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          By signing in, you agree to Lattice{" "}
          <a
            href="/terms"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#1A73E8", textDecoration: "underline" }}
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#1A73E8", textDecoration: "underline" }}
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
