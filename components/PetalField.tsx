import React from "react";

type PetalFieldProps = {
  variant?: "red" | "ivory";
  count?: number;
  className?: string;
};

export default function PetalField({
  count = 12,
  className = "",
}: PetalFieldProps) {
  const items = Array.from({ length: count }, (_, index) => {
    const left = 5 + ((index * 9.7) % 90);
    const duration = 12 + (index % 6) * 2.2;
    const delay = -(index * 1.5);
    const size = 16 + (index % 4) * 5;
    const rotation = (index * 45) % 360;
    // Alternate between ring, diamond, and sparkle
    const type = index % 3 === 0 ? "ring" : index % 3 === 1 ? "diamond" : "sparkle";

    return {
      left,
      duration,
      delay,
      size,
      rotation,
      type,
      opacity: 0.35 + (index % 3) * 0.15,
    };
  });

  return (
    <div aria-hidden className={`petal-field ${className}`}>
      {items.map((item, index) => (
        <span
          key={index}
          className="petal"
          style={{
            left: `${item.left}%`,
            width: `${item.size}px`,
            height: `${item.size}px`,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
            opacity: item.opacity,
            display: "inline-block",
          }}
        >
          {item.type === "ring" ? (
            // Luxury Gold Ring SVG
            <svg
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: `rotate(${item.rotation}deg)`, width: "100%", height: "100%" }}
            >
              {/* Diamond on top */}
              <path
                d="M50 15L35 30H65L50 15Z"
                fill="url(#goldGrad)"
                stroke="#ffe3a3"
                strokeWidth="2"
              />
              <path
                d="M50 15L43 30H57L50 15Z"
                fill="#ffffff"
                opacity="0.8"
              />
              {/* Ring Band */}
              <circle
                cx="50"
                cy="55"
                r="25"
                stroke="url(#goldGrad)"
                strokeWidth="6"
              />
              <circle
                cx="50"
                cy="55"
                r="25"
                stroke="#ffe3a3"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />
              <defs>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffe3a3" />
                  <stop offset="50%" stopColor="#d8b27a" />
                  <stop offset="100%" stopColor="#a88548" />
                </linearGradient>
              </defs>
            </svg>
          ) : item.type === "diamond" ? (
            // Sparkling Diamond SVG
            <svg
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: `rotate(${item.rotation}deg)`, width: "100%", height: "100%" }}
            >
              <path
                d="M50 10L80 35L50 90L20 35L50 10Z"
                fill="url(#diaGrad)"
                stroke="#ffffff"
                strokeWidth="2"
              />
              <path
                d="M50 10L35 35H65L50 10Z"
                fill="#ffffff"
                opacity="0.4"
              />
              <path
                d="M35 35L20 35L50 90L35 35Z"
                fill="#7dd3fc"
                opacity="0.3"
              />
              <path
                d="M65 35L80 35L50 90L65 35Z"
                fill="#e0f2fe"
                opacity="0.3"
              />
              <path
                d="M50 10L20 35H35L50 10Z"
                fill="#ffffff"
                opacity="0.6"
              />
              <path
                d="M50 10L80 35H65L50 10Z"
                fill="#38bdf8"
                opacity="0.3"
              />
              <defs>
                <linearGradient id="diaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="30%" stopColor="#e0f2fe" />
                  <stop offset="70%" stopColor="#bae6fd" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
              </defs>
            </svg>
          ) : (
            // Sparkling Star SVG
            <svg
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "100%", height: "100%" }}
            >
              <path
                d="M50 0C50 27.6 27.6 50 0 50C27.6 50 50 72.4 50 100C50 72.4 72.4 50 100 50C72.4 50 50 27.6 50 0Z"
                fill="url(#starGrad)"
              />
              <defs>
                <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#ffe3a3" />
                  <stop offset="100%" stopColor="#d8b27a" />
                </linearGradient>
              </defs>
            </svg>
          )}
        </span>
      ))}
    </div>
  );
}
