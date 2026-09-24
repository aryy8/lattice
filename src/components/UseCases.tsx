import React from "react";
import {
  DocumentIcon,
  MailIcon,
  ListCheckIcon,
  PencilIcon,
  GlobeIcon,
  ChatIcon,
} from "./Icons";

export function UseCases() {
  const useCases = [
    {
      title: "Academic writing",
      desc: "Make your drafts sound more natural and less like AI-generated text.",
      icon: <DocumentIcon size={20} color="#1A73E8" />,
      bg: "#E8F0FE",
    },
    {
      title: "Emails & communication",
      desc: "Get a cleaner, more human-like expression for your messages.",
      icon: <MailIcon size={20} color="#7B1FA2" />,
      bg: "#F3E8FD",
    },
    {
      title: "Content creation",
      desc: "Refresh your content while keeping the core message.",
      icon: <ListCheckIcon size={20} color="#188038" />,
      bg: "#E6F4EA",
    },
    {
      title: "Reports & documentation",
      desc: "Improve readability and reduce AI detection patterns.",
      icon: <PencilIcon size={20} color="#EA8600" />,
      bg: "#FEF7E0",
    },
    {
      title: "Multilingual expression",
      desc: "Explore new ways to express your ideas across languages.",
      icon: <GlobeIcon size={20} color="#D93025" />,
      bg: "#FCE8E6",
    },
    {
      title: "Everyday writing",
      desc: "Make any text sound more natural, clear and human.",
      icon: <ChatIcon size={20} color="#C5221F" />,
      bg: "#FCE8E6",
    },
  ];

  return (
    <section className="use-cases-section">
      <div className="lattice-container">
        <div className="section-overline">USE CASES</div>
        <h2 className="how-heading" style={{ marginBottom: "28px" }}>
          Useful in many situations.
        </h2>

        <div className="use-cases-grid">
          {useCases.map((item) => (
            <div key={item.title} className="use-case-card">
              <div
                className="use-case-icon-badge"
                style={{ backgroundColor: item.bg }}
              >
                {item.icon}
              </div>
              <div className="use-case-content">
                <h3 className="use-case-title">{item.title}</h3>
                <p className="use-case-text">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
