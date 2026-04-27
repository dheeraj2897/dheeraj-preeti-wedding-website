type RoseLeafProps = {
  size?: number;
  seed?: string | number;
  /** "single" = one leaflet, "compound" = three leaflets on a stem (true rose leaf). */
  variant?: "single" | "compound";
  className?: string;
  style?: React.CSSProperties;
};

const LEAF_PATH =
  "M0,0 C-22,8 -42,28 -56,56 C-66,76 -68,90 -64,96 C-56,100 -42,92 -30,74 C-22,62 -16,50 -10,36 C-6,22 -2,10 0,0 Z";

const SERRATIONS =
  "M-30,18 l-3,3 l4,2 M-40,32 l-3,3 l4,2 M-50,46 l-3,3 l4,2 M-58,62 l-3,3 l4,2 M-58,80 l-3,3 l4,2";

const CENTER_VEIN = "M-2,-2 C-18,12 -38,34 -58,72";
const SIDE_VEINS =
  "M-12,8 q-6,8 -16,18 M-22,22 q-8,8 -20,22 M-32,38 q-8,8 -22,22 M-44,56 q-8,8 -16,22";

export default function RoseLeaf({
  size = 80,
  seed = 0,
  variant = "single",
  className,
  style,
}: RoseLeafProps) {
  const uid = `leaf-${String(seed).replace(/[^a-z0-9_-]/gi, "")}`;
  const idFill = `${uid}-fill`;
  const idSheen = `${uid}-sheen`;
  const idDrop = `${uid}-drop`;
  const vein = "rgba(6, 22, 14, 0.6)";

  const aspect = variant === "compound" ? 1.4 : 1.05;
  const width = size;
  const height = size * aspect;

  return (
    <svg
      aria-hidden
      viewBox={
        variant === "compound" ? "-130 -20 260 240" : "-90 -10 180 160"
      }
      width={width}
      height={height}
      className={className}
      style={style}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={idFill} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#5d8763" />
          <stop offset="35%" stopColor="#406447" />
          <stop offset="75%" stopColor="#26482f" />
          <stop offset="100%" stopColor="#13301f" />
        </linearGradient>
        <radialGradient id={idSheen} cx="38%" cy="22%" r="40%">
          <stop offset="0%" stopColor="#9bc09f" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#9bc09f" stopOpacity="0" />
        </radialGradient>
        <filter id={idDrop} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.8" />
          <feOffset dx="0" dy="2" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.5" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter={`url(#${idDrop})`}>
        {variant === "compound" && (
          <>
            {/* Stem */}
            <path
              d="M0,200 C0,140 0,80 0,0"
              fill="none"
              stroke="#3a5a35"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            {/* Side leaflets */}
            <g transform="translate(-2 80) rotate(-50)">
              <Leaflet idFill={idFill} idSheen={idSheen} vein={vein} scale={0.78} />
            </g>
            <g transform="translate(2 80) rotate(50) scale(-1 1)">
              <Leaflet idFill={idFill} idSheen={idSheen} vein={vein} scale={0.78} />
            </g>
            <g transform="translate(-2 130) rotate(-40)">
              <Leaflet idFill={idFill} idSheen={idSheen} vein={vein} scale={0.7} />
            </g>
            <g transform="translate(2 130) rotate(40) scale(-1 1)">
              <Leaflet idFill={idFill} idSheen={idSheen} vein={vein} scale={0.7} />
            </g>
            {/* Terminal leaflet */}
            <g transform="translate(0 0) rotate(180) scale(-1 -1)">
              <Leaflet idFill={idFill} idSheen={idSheen} vein={vein} scale={1} />
            </g>
          </>
        )}
        {variant === "single" && (
          <Leaflet idFill={idFill} idSheen={idSheen} vein={vein} scale={1} />
        )}
      </g>
    </svg>
  );
}

function Leaflet({
  idFill,
  idSheen,
  vein,
  scale,
}: {
  idFill: string;
  idSheen: string;
  vein: string;
  scale: number;
}) {
  return (
    <g transform={`scale(${scale})`}>
      <path
        d={LEAF_PATH}
        fill={`url(#${idFill})`}
        stroke={vein}
        strokeWidth="0.7"
      />
      <path
        d={LEAF_PATH}
        fill={`url(#${idSheen})`}
      />
      <path
        d={SERRATIONS}
        fill="none"
        stroke={vein}
        strokeWidth="0.5"
        opacity="0.6"
      />
      <path
        d={CENTER_VEIN}
        fill="none"
        stroke={vein}
        strokeWidth="0.85"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d={SIDE_VEINS}
        fill="none"
        stroke={vein}
        strokeWidth="0.45"
        strokeLinecap="round"
        opacity="0.6"
      />
    </g>
  );
}
