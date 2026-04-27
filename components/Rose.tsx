type RoseVariant = "red" | "ivory" | "blush";

type RoseProps = {
  variant?: RoseVariant;
  size?: number;
  seed?: string | number;
  withLeaves?: boolean;
  goldTrim?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Cabbage-rose / peony-style petal silhouettes (centered on origin, opening upward toward -y).
 * The petals are wider and more rounded than classic teardrops, with subtle ruffles at the tip.
 * Asymmetric "curl-left" and "curl-right" variants are mixed within rings to read as a real bloom.
 */
const PETAL_SYM_WIDE =
  "M0,0 C-44,-6 -60,-26 -56,-52 C-52,-72 -38,-82 -22,-78 C-12,-76 -6,-74 0,-74 C6,-74 12,-76 22,-78 C38,-82 52,-72 56,-52 C60,-26 44,-6 0,0 Z";

const PETAL_SYM_ROUND =
  "M0,0 C-36,-6 -52,-22 -50,-46 C-48,-66 -34,-76 -20,-72 C-10,-70 -4,-68 0,-68 C4,-68 10,-70 20,-72 C34,-76 48,-66 50,-46 C52,-22 36,-6 0,0 Z";

const PETAL_CURL_LEFT =
  "M0,0 C-30,-8 -50,-26 -52,-52 C-54,-74 -42,-86 -22,-84 C-8,-82 0,-72 -2,-54 C-4,-36 -4,-18 0,0 Z";

const PETAL_CURL_RIGHT =
  "M0,0 C30,-8 50,-26 52,-52 C54,-74 42,-86 22,-84 C8,-82 0,-72 2,-54 C4,-36 4,-18 0,0 Z";

const PETAL_TIGHT_LEFT =
  "M0,0 C-18,-6 -28,-20 -28,-40 C-28,-54 -18,-62 -8,-58 C-2,-56 0,-50 -1,-38 C-3,-26 -2,-12 0,0 Z";

const PETAL_TIGHT_RIGHT =
  "M0,0 C18,-6 28,-20 28,-40 C28,-54 18,-62 8,-58 C2,-56 0,-50 1,-38 C3,-26 2,-12 0,0 Z";

const PETAL_INNER_CURL =
  "M0,0 C-10,-4 -16,-16 -12,-28 C-8,-36 4,-38 6,-26 C6,-18 -2,-14 -4,-8 C-8,-4 -8,-2 0,0 Z";

/** Inner-base shadow path — same general shape as a petal but inset, to deepen the seam between rings. */
const PETAL_SHADOW =
  "M0,0 C-32,-4 -42,-22 -32,-36 C-22,-46 -10,-44 0,-38 C10,-44 22,-46 32,-36 C42,-22 32,-4 0,0 Z";

/** Soft fold line down the petal centerline. */
const PETAL_FOLD = "M0,-10 C-2,-28 -2,-54 0,-72";

type Ring = {
  count: number;
  scale: number;
  offset: number;
  shade: "outer" | "mid" | "inner" | "curl";
  pattern: "wide" | "round" | "curl" | "tight" | "inner";
  jitter?: number;
  scaleVar?: number;
};

const RINGS: Ring[] = [
  { count: 9, scale: 1.0, offset: 0, shade: "outer", pattern: "wide", jitter: 6, scaleVar: 0.06 },
  { count: 11, scale: 0.86, offset: 16, shade: "outer", pattern: "wide", jitter: 8, scaleVar: 0.05 },
  { count: 12, scale: 0.74, offset: 7, shade: "mid", pattern: "round", jitter: 6, scaleVar: 0.05 },
  { count: 11, scale: 0.62, offset: 22, shade: "mid", pattern: "curl", jitter: 8, scaleVar: 0.06 },
  { count: 10, scale: 0.52, offset: 12, shade: "mid", pattern: "curl", jitter: 8, scaleVar: 0.05 },
  { count: 9, scale: 0.42, offset: 24, shade: "inner", pattern: "tight", jitter: 10, scaleVar: 0.06 },
  { count: 8, scale: 0.34, offset: 6, shade: "inner", pattern: "tight", jitter: 10, scaleVar: 0.06 },
  { count: 7, scale: 0.27, offset: 18, shade: "inner", pattern: "tight", jitter: 12, scaleVar: 0.07 },
  { count: 6, scale: 0.21, offset: 0, shade: "curl", pattern: "inner", jitter: 14, scaleVar: 0.08 },
  { count: 5, scale: 0.15, offset: 24, shade: "curl", pattern: "inner", jitter: 16, scaleVar: 0.08 },
];

const PALETTES = {
  red: {
    outer: ["#1d0006", "#4d0012", "#8a0a26", "#bd1c44", "#dc4567"],
    mid: ["#15000a", "#3e000f", "#770020", "#a31040", "#c12a52"],
    inner: ["#0e0005", "#2e000a", "#5c0018", "#820028", "#a40e3a"],
    curl: ["#080003", "#1e0006", "#420012", "#660020"],
    edgeDark: "rgba(20, 0, 6, 0.6)",
    edgeLight: "rgba(255, 220, 226, 0.45)",
    sheen: "rgba(255, 220, 230, 0.7)",
    foldShadow: "rgba(20, 0, 6, 0.4)",
    leaf: ["#13301f", "#26482f", "#3a6044", "#56825d"],
    leafVein: "rgba(8, 26, 16, 0.6)",
    gold: "#d4a256",
  },
  ivory: {
    outer: ["#85664a", "#b8946d", "#dec3a1", "#f3e6cc", "#fffef6"],
    mid: ["#735439", "#a07c54", "#c9a87f", "#e8d1a8", "#f8eccd"],
    inner: ["#5e4128", "#866238", "#b08658", "#d4ad7c", "#eccfa3"],
    curl: ["#3e2814", "#5d3e1e", "#85603a", "#a8825a"],
    edgeDark: "rgba(60, 36, 14, 0.45)",
    edgeLight: "rgba(255, 252, 240, 0.7)",
    sheen: "rgba(255, 252, 240, 0.85)",
    foldShadow: "rgba(60, 36, 14, 0.32)",
    leaf: ["#15321f", "#2a4a30", "#406447", "#5d8763"],
    leafVein: "rgba(8, 26, 16, 0.55)",
    gold: "#bf9352",
  },
  blush: {
    outer: ["#82384a", "#a85067", "#cf7a8e", "#e8a3b3", "#f6d2d8"],
    mid: ["#6f2c3d", "#974056", "#b9617b", "#d68aa1", "#ecbac6"],
    inner: ["#5a1f2d", "#80324a", "#a04e6a", "#c07289", "#dba1b3"],
    curl: ["#3d0f1c", "#601e30", "#852e48", "#a9445d"],
    edgeDark: "rgba(60, 12, 26, 0.5)",
    edgeLight: "rgba(255, 232, 236, 0.65)",
    sheen: "rgba(255, 232, 236, 0.8)",
    foldShadow: "rgba(60, 12, 26, 0.32)",
    leaf: ["#15321f", "#2a4a30", "#406447", "#5d8763"],
    leafVein: "rgba(8, 26, 16, 0.55)",
    gold: "#d49460",
  },
} as const;

function pickPattern(pattern: Ring["pattern"], i: number, ringIndex: number): string {
  if (pattern === "wide") return PETAL_SYM_WIDE;
  if (pattern === "round") return PETAL_SYM_ROUND;
  if (pattern === "inner") return PETAL_INNER_CURL;
  // alternate left / right curl petals around the rose for an asymmetric, spiraled feel
  const flip = (i + ringIndex) % 2 === 0;
  if (pattern === "curl") return flip ? PETAL_CURL_RIGHT : PETAL_CURL_LEFT;
  return flip ? PETAL_TIGHT_RIGHT : PETAL_TIGHT_LEFT;
}

export default function Rose({
  variant = "red",
  size = 160,
  seed = 0,
  withLeaves = true,
  goldTrim = false,
  className,
  style,
}: RoseProps) {
  const palette = PALETTES[variant];
  const uid = `rose-${variant}-${String(seed).replace(/[^a-z0-9_-]/gi, "")}`;
  const idOuter = `${uid}-outer`;
  const idMid = `${uid}-mid`;
  const idInner = `${uid}-inner`;
  const idCurl = `${uid}-curl`;
  const idShadow = `${uid}-shadow`;
  const idSheen = `${uid}-sheen`;
  const idHighlight = `${uid}-hl`;
  const idLeaf = `${uid}-leaf`;
  const idDrop = `${uid}-drop`;

  return (
    <svg
      aria-hidden
      viewBox="-120 -120 240 240"
      width={size}
      height={size}
      className={className}
      style={style}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id={idOuter} cx="50%" cy="100%" r="115%" fx="50%" fy="100%">
          <stop offset="0%" stopColor={palette.outer[0]} />
          <stop offset="20%" stopColor={palette.outer[1]} />
          <stop offset="50%" stopColor={palette.outer[2]} />
          <stop offset="80%" stopColor={palette.outer[3]} />
          <stop offset="100%" stopColor={palette.outer[4]} />
        </radialGradient>
        <radialGradient id={idMid} cx="50%" cy="100%" r="105%" fx="50%" fy="100%">
          <stop offset="0%" stopColor={palette.mid[0]} />
          <stop offset="25%" stopColor={palette.mid[1]} />
          <stop offset="55%" stopColor={palette.mid[2]} />
          <stop offset="82%" stopColor={palette.mid[3]} />
          <stop offset="100%" stopColor={palette.mid[4]} />
        </radialGradient>
        <radialGradient id={idInner} cx="50%" cy="100%" r="100%" fx="50%" fy="100%">
          <stop offset="0%" stopColor={palette.inner[0]} />
          <stop offset="35%" stopColor={palette.inner[1]} />
          <stop offset="65%" stopColor={palette.inner[2]} />
          <stop offset="88%" stopColor={palette.inner[3]} />
          <stop offset="100%" stopColor={palette.inner[4]} />
        </radialGradient>
        <radialGradient id={idCurl} cx="50%" cy="100%" r="100%" fx="50%" fy="100%">
          <stop offset="0%" stopColor={palette.curl[0]} />
          <stop offset="40%" stopColor={palette.curl[1]} />
          <stop offset="80%" stopColor={palette.curl[2]} />
          <stop offset="100%" stopColor={palette.curl[3]} />
        </radialGradient>
        <radialGradient id={idShadow} cx="50%" cy="100%" r="100%" fx="50%" fy="100%">
          <stop offset="0%" stopColor={palette.edgeDark} stopOpacity="0.95" />
          <stop offset="55%" stopColor={palette.edgeDark} stopOpacity="0.4" />
          <stop offset="100%" stopColor={palette.edgeDark} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={idSheen} x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor={palette.sheen} stopOpacity="0" />
          <stop offset="65%" stopColor={palette.sheen} stopOpacity="0" />
          <stop offset="86%" stopColor={palette.sheen} stopOpacity="0.55" />
          <stop offset="100%" stopColor={palette.sheen} stopOpacity="0" />
        </linearGradient>
        <radialGradient id={idHighlight} cx="38%" cy="30%" r="34%">
          <stop offset="0%" stopColor={palette.sheen} stopOpacity="0.6" />
          <stop offset="100%" stopColor={palette.sheen} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={idLeaf} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor={palette.leaf[3]} />
          <stop offset="55%" stopColor={palette.leaf[2]} />
          <stop offset="100%" stopColor={palette.leaf[0]} />
        </linearGradient>
        <filter id={idDrop} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2.6" />
          <feOffset dx="0" dy="3" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.55" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {withLeaves && (
        <g>
          {/* Compound rose leaf clusters poking out from below the bloom */}
          <g transform="translate(-58 78) rotate(-32)">
            <RoseSubLeaf fillId={idLeaf} vein={palette.leafVein} />
          </g>
          <g transform="translate(58 78) rotate(32) scale(-1 1)">
            <RoseSubLeaf fillId={idLeaf} vein={palette.leafVein} />
          </g>
          <g transform="translate(-22 92) rotate(-8)">
            <SmallLeaf fillId={idLeaf} vein={palette.leafVein} />
          </g>
          <g transform="translate(22 92) rotate(8) scale(-1 1)">
            <SmallLeaf fillId={idLeaf} vein={palette.leafVein} />
          </g>
        </g>
      )}

      <g filter={`url(#${idDrop})`}>
        {RINGS.map((ring, ringIndex) => {
          const fillId =
            ring.shade === "outer"
              ? idOuter
              : ring.shade === "mid"
                ? idMid
                : ring.shade === "inner"
                  ? idInner
                  : idCurl;

          return (
            <g key={ringIndex}>
              {Array.from({ length: ring.count }).map((_, i) => {
                const baseAngle = (360 / ring.count) * i + ring.offset;
                const jitter = ring.jitter
                  ? ((i * 31 + ringIndex * 17) % (ring.jitter * 2)) - ring.jitter
                  : 0;
                const angle = baseAngle + jitter;
                const scaleVar = ring.scaleVar
                  ? 1 +
                    ((((i * 13 + ringIndex * 7) % 100) / 100) * 2 - 1) *
                      ring.scaleVar
                  : 1;
                const finalScale = ring.scale * scaleVar;
                const path = pickPattern(ring.pattern, i, ringIndex);
                const isOutermost = ring.shade === "outer";
                const isCurl = ring.shade === "curl";

                return (
                  <g
                    key={i}
                    transform={`rotate(${angle}) scale(${finalScale})`}
                  >
                    <path
                      d={path}
                      fill={`url(#${fillId})`}
                      stroke={palette.edgeDark}
                      strokeWidth={isOutermost ? 1.0 : ring.shade === "mid" ? 0.7 : 0.45}
                      strokeLinejoin="round"
                    />
                    {/* Base shadow — anchors each petal under the next layer */}
                    {!isCurl && (
                      <path
                        d={PETAL_SHADOW}
                        fill={`url(#${idShadow})`}
                        opacity={isOutermost ? 0.85 : ring.shade === "mid" ? 0.7 : 0.55}
                      />
                    )}
                    {/* Bright sheen along the outer rim */}
                    {!isCurl && (
                      <path
                        d={path}
                        fill={`url(#${idSheen})`}
                        opacity={isOutermost ? 0.45 : 0.55}
                      />
                    )}
                    {/* Asymmetric soft highlight for 3D feel */}
                    {isOutermost && (
                      <path
                        d={path}
                        fill={`url(#${idHighlight})`}
                        opacity="0.55"
                      />
                    )}
                    {/* Center fold line */}
                    {!isCurl && ring.shade !== "inner" && (
                      <path
                        d={PETAL_FOLD}
                        fill="none"
                        stroke={palette.foldShadow}
                        strokeWidth="0.8"
                        strokeLinecap="round"
                        opacity="0.55"
                      />
                    )}
                    {/* Inner edge highlight */}
                    {isOutermost && (
                      <path
                        d={path}
                        fill="none"
                        stroke={palette.edgeLight}
                        strokeWidth="0.55"
                        opacity="0.55"
                        transform="scale(0.96)"
                      />
                    )}
                    {/* Optional gold filigree on the very outer edge — Indian-wedding feel */}
                    {goldTrim && isOutermost && (
                      <path
                        d={path}
                        fill="none"
                        stroke={palette.gold}
                        strokeWidth="0.7"
                        strokeOpacity="0.85"
                        transform="scale(1.005)"
                      />
                    )}
                  </g>
                );
              })}
            </g>
          );
        })}

        {/* Tight center cluster — many small overlapping curls all the way to the heart of the bloom */}
        <g>
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (360 / 8) * i + 11;
            return (
              <path
                key={i}
                d={PETAL_INNER_CURL}
                transform={`rotate(${angle}) scale(0.12)`}
                fill={`url(#${idCurl})`}
                stroke={palette.edgeDark}
                strokeWidth="0.3"
              />
            );
          })}
          {Array.from({ length: 5 }).map((_, i) => {
            const angle = (360 / 5) * i + 36;
            return (
              <path
                key={i}
                d={PETAL_INNER_CURL}
                transform={`rotate(${angle}) scale(0.07)`}
                fill={`url(#${idCurl})`}
              />
            );
          })}
        </g>
      </g>
    </svg>
  );
}

function RoseSubLeaf({ fillId, vein }: { fillId: string; vein: string }) {
  // Compound leaf with serrated edge
  return (
    <g>
      <path
        d="M0,0 C-22,8 -42,28 -56,56 C-66,76 -68,88 -64,94 C-56,98 -44,90 -32,72 C-26,62 -22,54 -16,42 C-12,28 -6,12 0,0 Z"
        fill={`url(#${fillId})`}
        stroke={vein}
        strokeWidth="0.5"
      />
      {/* Serrated notches along the leaf edge */}
      <path
        d="M-30,18 l-3,3 l4,2 M-40,32 l-3,3 l4,2 M-50,46 l-3,3 l4,2 M-58,62 l-3,3 l4,2"
        fill="none"
        stroke={vein}
        strokeWidth="0.45"
        opacity="0.6"
      />
      {/* Center vein */}
      <path
        d="M-2,-2 C-18,12 -38,34 -56,72"
        fill="none"
        stroke={vein}
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.75"
      />
      {/* Side veins */}
      <path
        d="M-12,8 q-6,8 -14,18 M-22,22 q-8,8 -18,22 M-32,38 q-8,8 -18,22"
        fill="none"
        stroke={vein}
        strokeWidth="0.4"
        strokeLinecap="round"
        opacity="0.55"
      />
    </g>
  );
}

function SmallLeaf({ fillId, vein }: { fillId: string; vein: string }) {
  return (
    <g>
      <path
        d="M0,0 C-18,6 -32,22 -42,46 C-48,60 -48,68 -44,72 C-36,74 -26,66 -18,52 C-12,40 -6,22 0,0 Z"
        fill={`url(#${fillId})`}
        stroke={vein}
        strokeWidth="0.45"
        opacity="0.92"
      />
      <path
        d="M-2,-2 C-14,12 -30,30 -42,58"
        fill="none"
        stroke={vein}
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity="0.7"
      />
    </g>
  );
}
