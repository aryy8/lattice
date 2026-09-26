import React from "react";
import Link from "next/link";
import { LatticeLogo, ArrowLeftIcon } from "@/components/Icons";

export const metadata = {
  title: "Privacy Policy — Lattice",
  description: "Privacy Policy for Lattice language-path text transformation platform.",
};

export default function PrivacyPage() {
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
              transition: "background-color 0.2s ease",
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
            Privacy Policy
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
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#202124",
                  marginBottom: "10px",
                }}
              >
                1. Overview
              </h2>
              <p>
                Lattice (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) respects your privacy.
                This Privacy Policy explains how we collect, use, and protect your information when
                you use our website located at{" "}
                <a
                  href="https://lattice.aryy.in"
                  style={{ color: "#1A73E8", textDecoration: "underline" }}
                >
                  https://lattice.aryy.in
                </a>{" "}
                and associated language-path transformation services.
              </p>
            </section>

            <section>
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#202124",
                  marginBottom: "10px",
                }}
              >
                2. Information We Collect
              </h2>
              <p style={{ marginBottom: "10px" }}>
                We collect minimal personal data necessary to provide and improve our services:
              </p>
              <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <li>
                  <strong>Google Profile Information:</strong> When you sign in using Google OAuth
                  2.0, we receive basic account information including your name, email address, and
                  profile picture URL.
                </li>
                <li>
                  <strong>Input Text:</strong> Text snippets you enter into the Lattice tool for multi-hop translation.
                </li>
                <li>
                  <strong>Local Session Data:</strong> Authentication sessions and transformation
                  histories stored locally on your device for user convenience.
                </li>
              </ul>
            </section>

            <section>
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#202124",
                  marginBottom: "10px",
                }}
              >
                3. How We Use Your Information
              </h2>
              <p style={{ marginBottom: "10px" }}>Your information is used strictly to:</p>
              <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <li>Authenticate your account and maintain active sign-in sessions.</li>
                <li>Process language transformations requested by you.</li>
                <li>Allow you to access and manage your transformation history.</li>
                <li>Maintain compliance with Google API User Data Policy.</li>
              </ul>
            </section>

            <section>
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#202124",
                  marginBottom: "10px",
                }}
              >
                4. Data Protection &amp; Sharing
              </h2>
              <p>
                <strong>We do not sell, rent, or trade your personal information.</strong> We do not
                share your personal profile or input data with third parties, except as required
                by law or necessary to execute external translation API requests to deliver your output.
              </p>
            </section>

            <section>
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#202124",
                  marginBottom: "10px",
                }}
              >
                5. Google API Limited Use Requirements
              </h2>
              <p>
                Lattice&apos;s use and transfer of information received from Google APIs to any other
                app will adhere to the{" "}
                <a
                  href="https://developers.google.com/terms/api-services-user-data-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#1A73E8", textDecoration: "underline" }}
                >
                  Google API Services User Data Policy
                </a>
                , including the Limited Use requirements.
              </p>
            </section>

            <section>
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#202124",
                  marginBottom: "10px",
                }}
              >
                6. Your Rights &amp; Control
              </h2>
              <p>
                You can sign out of Lattice at any time by clicking your user avatar in the top
                navigation bar and selecting &quot;Sign out&quot;. You can also clear your local transformation
                history with a single click in the History drawer.
              </p>
            </section>

            <section>
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#202124",
                  marginBottom: "10px",
                }}
              >
                7. Contact Us
              </h2>
              <p>
                If you have questions regarding this Privacy Policy, please contact us at:{" "}
                <a
                  href="mailto:support@aryy.in"
                  style={{ color: "#1A73E8", textDecoration: "underline" }}
                >
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
