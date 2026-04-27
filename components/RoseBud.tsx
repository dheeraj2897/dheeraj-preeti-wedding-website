type BudVariant = "red" | "ivory" | "blush";

type RoseBudProps = {
  variant?: BudVariant;
  size?: number;
  seed?: string | number;
  withStem?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

const PALETTES = {
  red: {
    petal: ["#1c0006", "#570016", "#8c0a26", "#bd1c44", "#dc3f60"],
    edge: "rgba(20, 0, 6, 0.6)",
    sheen: "rgba(255, 220, 226, 0.55)",
    sepal: ["#2b4a30", "#4d6e44", "#6b8e58"],
    stem: "#3a5a35",
  },
  ivory: {
    petal: ["#7a5d3e", "#a98263", "#d2b285", "#eed6a8", "#fcf2d6"],
    edge: "rgba(60, 36, 14, 0.45)",
    sheen: "rgba(255, 252, 240, 0.7)",
    sepal: ["#2b4a30", "#4d6e44", "#6b8e58"],
    stem: "#3a5a35",
  },
  blush: {
    petal: ["#5e1f2c", "#8a3046", "#b15a72", "#d6859a", "#efb8c4"],
    edge: "rgba(60, 12, 26, 0.5)",
    sheen: "rgba(255, 232, 236, 0.65)",
    sepal: ["#2b4a30", "#4d6e44", "#6b8e58"],
    stem: "#3a5a35",
  },
} as const;

export default function RoseBud({
  variant = "red",
  size = 60,
  seed = 0,
  withStem = false,
  className,
  style,
}: RoseBudProps) {
  const palette = PALETTES[variant];
  const uid = `bud-${variant}-${String(seed).replace(/[^a-z0-9_-]/gi, "")}`;
  const idPetal = `${uid}-petal`;
  const idHl = `${uid}-hl`;
  const idSepal = `${uid}-sepal`;
  const idDrop = `${uid}-drop`;

  return (
    <svg
      aria-hidden
      viewBox="-60 -100 120 200"
      width={size}
      height={(size * 200) / 120}
      className={className}
      style={style}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id={idPetal} cx="42%" cy="60%" r="65%">
          <stop offset="0%" stopColor={palette.petal[4]} />
          <stop offset="35%" stopColor={palette.petal[3]} />
          <stop offset="70%" stopColor={palette.petal[2]} />
          <stop offset="100%" stopColor={palette.petal[0]} />
        </radialGradient>
        <radialGradient id={idHl} cx="38%" cy="38%" r="35%">
          <stop offset="0%" stopColor={palette.sheen} stopOpacity="0.7" />
          <stop offset="100%" stopColor={palette.sheen} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={idSepal} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor={palette.sepal[2]} />
          <stop offset="100%" stopColor={palette.sepal[0]} />
        </linearGradient>
        <filter id={idDrop} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.6" />
          <feOffset dx="0" dy="2" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.55" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Stem (optional) */}
      {withStem && (
        <path
          d="M0,0 Q-3,30 0,72 Q3,90 -2,98"
          fill="none"
          stroke={palette.stem}
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.92"
        />
      )}

      <g filter={`url(#${idDrop})`}>
        {/* Sepals (the green leaf-like wraps at the base of the bud) */}
        <g>
          <path
            d="M0,0 C-22,2 -34,16 -36,42 C-38,58 -28,68 -16,64 C-6,60 -2,46 0,30 Z"
            fill={`url(#${idSepal})`}
            opacity="0.95"
          />
          <path
            d="M0,0 C22,2 34,16 36,42 C38,58 28,68 16,64 C6,60 2,46 0,30 Z"
            fill={`url(#${idSepal})`}
            opacity="0.95"
          />
          <path
            d="M0,4 C-6,16 -10,32 -8,46"
            fill="none"
            stroke="rgba(8, 26, 16, 0.55)"
            strokeWidth="0.6"
            opacity="0.7"
          />
          <path
            d="M0,4 C6,16 10,32 8,46"
            fill="none"
            stroke="rgba(8, 26, 16, 0.55)"
            strokeWidth="0.6"
            opacity="0.7"
          />
        </g>

        {/* Outer wrapped petal — the broadest layer of the closed bud */}
        <path
          d="M-26,-12 C-34,-44 -22,-78 4,-82 C28,-78 34,-58 32,-32 C30,-12 24,2 14,8 C-2,12 -22,8 -26,-12 Z"
          fill={`url(#${idPetal})`}
          stroke={palette.edge}
          strokeWidth="1"
          strokeLinejoin="round"
        />

        {/* Inner curled petal — visible top edge of the bud's interior */}
        <path
          d="M-14,-22 C-18,-50 -8,-72 10,-72 C24,-70 28,-54 24,-34 C22,-20 16,-12 6,-10 C-6,-10 -12,-14 -14,-22 Z"
          fill={`url(#${idPetal})`}
          stroke={palette.edge}
          strokeWidth="0.7"
          strokeLinejoin="round"
          transform="rotate(-6)"
        />

        {/* Tip curl — the very top of the bud where petal edges meet */}
        <path
          d="M-2,-66 C-14,-58 -16,-44 -8,-36 C0,-32 8,-36 10,-46 C12,-58 8,-66 -2,-66 Z"
          fill={`url(#${idPetal})`}
          stroke={palette.edge}
          strokeWidth="0.5"
          opacity="0.95"
        />

        {/* Soft highlight on the upper-left "shoulder" of the bud */}
        <path
          d="M-26,-12 C-34,-44 -22,-78 4,-82 C28,-78 34,-58 32,-32 C30,-12 24,2 14,8 C-2,12 -22,8 -26,-12 Z"
          fill={`url(#${idHl})`}
        />
      </g>
    </svg>
  );
}
