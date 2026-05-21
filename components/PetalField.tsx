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
    
    // Distribute as: 40% red-rose, 40% white-rose, 20% sparkle
    const type = 
      index % 5 === 0 || index % 5 === 2 
        ? "red-rose" 
        : index % 5 === 1 || index % 5 === 3 
          ? "white-rose" 
          : "sparkle";

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
          className={
            item.type === "red-rose"
              ? "petal"
              : item.type === "white-rose"
                ? "petal petal-ivory"
                : "petal" // fallback for sparkle so it animates
          }
          style={{
            left: `${item.left}%`,
            width: `${item.size}px`,
            height: `${item.size}px`,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
            opacity: item.opacity,
            display: "inline-block",
            // For sparkles, override background and border-radius so they are pure gold stars
            ...(item.type === "sparkle"
              ? {
                  background: "none",
                  borderRadius: "0",
                  boxShadow: "none",
                }
              : {}),
          }}
        >
          {item.type === "sparkle" && (
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
