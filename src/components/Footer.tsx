import React from "react";

interface FooterProps {
  onTryLattice?: () => void;
}

export function Footer({ onTryLattice }: FooterProps) {
  const handleScrollTop = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onTryLattice) {
      onTryLattice();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="site-footer">
      <div className="lattice-container footer-inner">
        <div className="footer-links">
          <a href="#try" onClick={handleScrollTop} className="footer-link">
            Try Lattice
          </a>
          <a href="#" className="footer-link">
            About
          </a>
          <a href="/privacy" className="footer-link">
            Privacy
          </a>
          <a href="/terms" className="footer-link">
            Terms
          </a>
          <a href="#" className="footer-link">
            Help
          </a>
        </div>

        <div className="footer-meta">
          <span onClick={handleScrollTop} style={{ cursor: "pointer" }}>
            Lattice • Text humanisation utility
          </span>
        </div>
      </div>
    </footer>
  );
}
