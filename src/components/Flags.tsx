import React from "react";

interface FlagProps {
  code: string;
  size?: number;
  className?: string;
}

export function Flag({ code, size = 18, className = "" }: FlagProps) {
  const upper = code.toUpperCase();

  const baseStyle: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "50%",
    overflow: "hidden",
    display: "inline-block",
    flexShrink: 0,
    verticalAlign: "middle",
    boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
  };

  switch (upper) {
    case "US":
    case "EN":
      return (
        <span style={baseStyle} className={className} title="English (United States)">
          <svg viewBox="0 0 32 32" width="100%" height="100%">
            <defs>
              <clipPath id="circle-us">
                <circle cx="16" cy="16" r="16" />
              </clipPath>
            </defs>
            <g clipPath="url(#circle-us)">
              {/* Red & white stripes */}
              <rect x="0" y="0" width="32" height="32" fill="#B22234" />
              <rect x="0" y="2.46" width="32" height="2.46" fill="#FFFFFF" />
              <rect x="0" y="7.38" width="32" height="2.46" fill="#FFFFFF" />
              <rect x="0" y="12.3" width="32" height="2.46" fill="#FFFFFF" />
              <rect x="0" y="17.22" width="32" height="2.46" fill="#FFFFFF" />
              <rect x="0" y="22.14" width="32" height="2.46" fill="#FFFFFF" />
              <rect x="0" y="27.06" width="32" height="2.46" fill="#FFFFFF" />
              {/* Blue canton */}
              <rect x="0" y="0" width="14" height="15" fill="#3C3B6E" />
              {/* White stars simplified */}
              <circle cx="3" cy="3.5" r="0.9" fill="#FFF" />
              <circle cx="7" cy="3.5" r="0.9" fill="#FFF" />
              <circle cx="11" cy="3.5" r="0.9" fill="#FFF" />
              <circle cx="5" cy="7.5" r="0.9" fill="#FFF" />
              <circle cx="9" cy="7.5" r="0.9" fill="#FFF" />
              <circle cx="3" cy="11.5" r="0.9" fill="#FFF" />
              <circle cx="7" cy="11.5" r="0.9" fill="#FFF" />
              <circle cx="11" cy="11.5" r="0.9" fill="#FFF" />
            </g>
          </svg>
        </span>
      );

    case "ES":
      return (
        <span style={baseStyle} className={className} title="Spanish (Spain)">
          <svg viewBox="0 0 32 32" width="100%" height="100%">
            <defs>
              <clipPath id="circle-es">
                <circle cx="16" cy="16" r="16" />
              </clipPath>
            </defs>
            <g clipPath="url(#circle-es)">
              {/* Top red stripe */}
              <rect x="0" y="0" width="32" height="8" fill="#AA151B" />
              {/* Middle yellow stripe */}
              <rect x="0" y="8" width="32" height="16" fill="#F1BF00" />
              {/* Bottom red stripe */}
              <rect x="0" y="24" width="32" height="8" fill="#AA151B" />
              {/* Coat of arms */}
              <rect x="8" y="12" width="5" height="7.5" rx="1.5" fill="#AA151B" />
              <circle cx="10.5" cy="11" r="1.5" fill="#AA151B" />
              <rect x="9" y="13.5" width="3" height="4.5" rx="0.5" fill="#F1BF00" />
              <line x1="6" y1="11" x2="6" y2="20" stroke="#AA151B" strokeWidth="1" strokeLinecap="round" />
              <line x1="15" y1="11" x2="15" y2="20" stroke="#AA151B" strokeWidth="1" strokeLinecap="round" />
            </g>
          </svg>
        </span>
      );

    case "DE":
      return (
        <span style={baseStyle} className={className} title="German (Germany)">
          <svg viewBox="0 0 32 32" width="100%" height="100%">
            <defs>
              <clipPath id="circle-de">
                <circle cx="16" cy="16" r="16" />
              </clipPath>
            </defs>
            <g clipPath="url(#circle-de)">
              <rect x="0" y="0" width="32" height="10.67" fill="#000000" />
              <rect x="0" y="10.67" width="32" height="10.67" fill="#DD0000" />
              <rect x="0" y="21.34" width="32" height="10.67" fill="#FFCE00" />
            </g>
          </svg>
        </span>
      );

    case "JP":
    case "JA":
      return (
        <span style={baseStyle} className={className} title="Japanese (Japan)">
          <svg viewBox="0 0 32 32" width="100%" height="100%">
            <defs>
              <clipPath id="circle-jp">
                <circle cx="16" cy="16" r="16" />
              </clipPath>
            </defs>
            <g clipPath="url(#circle-jp)">
              <rect x="0" y="0" width="32" height="32" fill="#FFFFFF" />
              <circle cx="16" cy="16" r="7.5" fill="#BC002D" />
            </g>
          </svg>
        </span>
      );

    case "FR":
      return (
        <span style={baseStyle} className={className} title="French (France)">
          <svg viewBox="0 0 32 32" width="100%" height="100%">
            <defs>
              <clipPath id="circle-fr">
                <circle cx="16" cy="16" r="16" />
              </clipPath>
            </defs>
            <g clipPath="url(#circle-fr)">
              <rect x="0" y="0" width="10.67" height="32" fill="#002395" />
              <rect x="10.67" y="0" width="10.67" height="32" fill="#FFFFFF" />
              <rect x="21.34" y="0" width="10.67" height="32" fill="#ED2939" />
            </g>
          </svg>
        </span>
      );

    case "IT":
      return (
        <span style={baseStyle} className={className} title="Italian (Italy)">
          <svg viewBox="0 0 32 32" width="100%" height="100%">
            <defs>
              <clipPath id="circle-it">
                <circle cx="16" cy="16" r="16" />
              </clipPath>
            </defs>
            <g clipPath="url(#circle-it)">
              <rect x="0" y="0" width="10.67" height="32" fill="#009246" />
              <rect x="10.67" y="0" width="10.67" height="32" fill="#FFFFFF" />
              <rect x="21.34" y="0" width="10.67" height="32" fill="#CE2B37" />
            </g>
          </svg>
        </span>
      );

    case "NL":
      return (
        <span style={baseStyle} className={className} title="Dutch (Netherlands)">
          <svg viewBox="0 0 32 32" width="100%" height="100%">
            <defs>
              <clipPath id="circle-nl">
                <circle cx="16" cy="16" r="16" />
              </clipPath>
            </defs>
            <g clipPath="url(#circle-nl)">
              <rect x="0" y="0" width="32" height="10.67" fill="#AE1C28" />
              <rect x="0" y="10.67" width="32" height="10.67" fill="#FFFFFF" />
              <rect x="0" y="21.34" width="32" height="10.67" fill="#21468B" />
            </g>
          </svg>
        </span>
      );

    case "PT":
      return (
        <span style={baseStyle} className={className} title="Portuguese (Portugal/Brazil)">
          <svg viewBox="0 0 32 32" width="100%" height="100%">
            <defs>
              <clipPath id="circle-pt">
                <circle cx="16" cy="16" r="16" />
              </clipPath>
            </defs>
            <g clipPath="url(#circle-pt)">
              <rect x="0" y="0" width="12" height="32" fill="#006600" />
              <rect x="12" y="0" width="20" height="32" fill="#FF0000" />
              <circle cx="12" cy="16" r="5" fill="#FFE600" />
              <rect x="10" y="14" width="4" height="4" fill="#FFFFFF" />
            </g>
          </svg>
        </span>
      );

    case "SE":
      return (
        <span style={baseStyle} className={className} title="Swedish (Sweden)">
          <svg viewBox="0 0 32 32" width="100%" height="100%">
            <defs>
              <clipPath id="circle-se">
                <circle cx="16" cy="16" r="16" />
              </clipPath>
            </defs>
            <g clipPath="url(#circle-se)">
              <rect x="0" y="0" width="32" height="32" fill="#005293" />
              <rect x="10" y="0" width="5" height="32" fill="#FECB00" />
              <rect x="0" y="13.5" width="32" height="5" fill="#FECB00" />
            </g>
          </svg>
        </span>
      );

    case "KR":
    case "KO":
      return (
        <span style={baseStyle} className={className} title="Korean (South Korea)">
          <svg viewBox="0 0 32 32" width="100%" height="100%">
            <defs>
              <clipPath id="circle-kr">
                <circle cx="16" cy="16" r="16" />
              </clipPath>
            </defs>
            <g clipPath="url(#circle-kr)">
              <rect x="0" y="0" width="32" height="32" fill="#FFFFFF" />
              <circle cx="16" cy="16" r="7" fill="#CD2E3A" />
              <path d="M 9,16 A 7,7 0 0,0 23,16 A 3.5,3.5 0 0,1 16,16 A 3.5,3.5 0 0,0 9,16" fill="#0047A0" />
            </g>
          </svg>
        </span>
      );

    case "CN":
    case "ZH":
      return (
        <span style={baseStyle} className={className} title="Chinese">
          <svg viewBox="0 0 32 32" width="100%" height="100%">
            <defs>
              <clipPath id="circle-cn">
                <circle cx="16" cy="16" r="16" />
              </clipPath>
            </defs>
            <g clipPath="url(#circle-cn)">
              <rect x="0" y="0" width="32" height="32" fill="#DE2910" />
              <polygon points="6,4 7,7 10,7 7.5,9 8.5,12 6,10 3.5,12 4.5,9 2,7 5,7" fill="#FFDE00" />
            </g>
          </svg>
        </span>
      );

    case "RU":
      return (
        <span style={baseStyle} className={className} title="Russian (Russia)">
          <svg viewBox="0 0 32 32" width="100%" height="100%">
            <defs>
              <clipPath id="circle-ru">
                <circle cx="16" cy="16" r="16" />
              </clipPath>
            </defs>
            <g clipPath="url(#circle-ru)">
              <rect x="0" y="0" width="32" height="10.67" fill="#FFFFFF" />
              <rect x="0" y="10.67" width="32" height="10.67" fill="#0039A6" />
              <rect x="0" y="21.34" width="32" height="10.67" fill="#D52B1E" />
            </g>
          </svg>
        </span>
      );

    case "IN":
    case "HI":
      return (
        <span style={baseStyle} className={className} title="Hindi (India)">
          <svg viewBox="0 0 32 32" width="100%" height="100%">
            <defs>
              <clipPath id="circle-in">
                <circle cx="16" cy="16" r="16" />
              </clipPath>
            </defs>
            <g clipPath="url(#circle-in)">
              <rect x="0" y="0" width="32" height="10.67" fill="#FF9933" />
              <rect x="0" y="10.67" width="32" height="10.67" fill="#FFFFFF" />
              <rect x="0" y="21.34" width="32" height="10.67" fill="#138808" />
              <circle cx="16" cy="16" r="3" fill="none" stroke="#000080" strokeWidth="1" />
            </g>
          </svg>
        </span>
      );

    default:
      return (
        <span style={baseStyle} className={className} title={code}>
          <svg viewBox="0 0 32 32" width="100%" height="100%">
            <rect x="0" y="0" width="32" height="32" fill="#E8F0FE" />
            <circle cx="16" cy="16" r="12" fill="none" stroke="#1A73E8" strokeWidth="2" />
            <text x="16" y="20" textAnchor="middle" fontSize="11" fill="#1A73E8" fontWeight="bold">
              {code.slice(0, 2).toUpperCase()}
            </text>
          </svg>
        </span>
      );
  }
}
