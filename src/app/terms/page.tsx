import React from "react";
import Link from "next/link";
import { LatticeLogo, ArrowLeftIcon } from "@/components/Icons";

export const metadata = {
  title: "Terms of Service — Lattice",
  description: "Terms of Service for Lattice language-path text transformation platform.",
};

export default function TermsPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F8F9FA", color: "#202124" }}>
      {/* Top Navigation */}
      <header
        style={{
          borderBottom: "1px solid #E8EAED",
          backgroundColor: "#FFFFFF",
          padding: "16px 24px",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
              color: "#202124",
              fontWeight: 700,
              fontSize: "18px",
            }}
          >
            <LatticeLogo size={28} />
            <span>Lattice</span>
          </Link>

          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13.5px",
              color: "#1A73E8",
              fontWeight: 500,
              textDecoration: "none",
              padding: "6px 14px",
              borderRadius: "20px",
              backgroundColor: "#E8F0FE",
            }}
          >
            <ArrowLeftIcon size={14} color="#1A73E8" />
            <span>Back to Lattice</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: "800px", margin: "40px auto", padding: "0 24px 60px 24px" }}>
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "16px",
            border: "1px solid #DADCE0",
            boxShadow: "0 1px 3px rgba(60, 64, 67, 0.08)",
            padding: "40px 36px",
          }}
        >
          <h1
            style={{
              fontSize: "32px",
              fontWeight: 700,
              color: "#202124",
              margin: "0 0 12px 0",
              letterSpacing: "-0.5px",
            }}
          >
            Terms of Service
          </h1>

          <p style={{ fontSize: "14px", color: "#5F6368", marginBottom: "32px" }}>
            Last updated: September 26, 2026
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "28px",
              fontSize: "15px",
              lineHeight: 1.6,
              color: "#3C4043",
            }}
          >
            <section>
              <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#202124", marginBottom: "10px" }}>
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or using Lattice (&quot;https://lattice.aryy.in&quot;), you agree to be bound by these Terms of Service. If you do not agree, please do not use the service.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#202124", marginBottom: "10px" }}>
                2. Use of Service
              </h2>
              <p>
                Lattice provides multi-hop language transformation features. You agree to use the service only for lawful purposes and in accordance with these Terms.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#202124", marginBottom: "10px" }}>
                3. User Accounts
              </h2>
              <p>
                Authentication is handled securely via Google OAuth 2.0. You are responsible for maintaining the confidentiality of your Google account credentials.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#202124", marginBottom: "10px" }}>
                4. Contact
              </h2>
              <p>
                For questions regarding these Terms, contact us at:{" "}
                <a href="mailto:support@aryy.in" style={{ color: "#1A73E8", textDecoration: "underline" }}>
                  support@aryy.in
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <footer
        style={{
          textAlign: "center",
          padding: "24px",
          color: "#70757A",
          fontSize: "13px",
          borderTop: "1px solid #E8EAED",
          backgroundColor: "#FFFFFF",
        }}
      >
        &copy; {new Date().getFullYear()} Lattice. All rights reserved.
      </footer>
    </div>
  );
}
