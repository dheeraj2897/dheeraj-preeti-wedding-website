"use client";

import { motion, useReducedMotion } from "framer-motion";
import Rose from "./Rose";
import RoseBud from "./RoseBud";
import RoseLeaf from "./RoseLeaf";

type RoseClusterProps = {
  className?: string;
  mirrored?: boolean;
  goldTrim?: boolean;
};

type Bloom =
  | {
      kind: "rose";
      variant: "red" | "ivory" | "blush";
      size: number;
      lift: number;
      rotate: number;
      withLeaves?: boolean;
      goldTrim?: boolean;
      z: number;
      offsetX?: number;
    }
  | {
      kind: "bud";
      variant: "red" | "ivory" | "blush";
      size: number;
      lift: number;
      rotate: number;
      z: number;
      offsetX?: number;
    }
  | {
      kind: "leaf";
      size: number;
      lift: number;
      rotate: number;
      z: number;
      flip?: boolean;
      offsetX?: number;
    };

/**
 * Bouquet composition — reads outside-in:
 *
 *   leaf · small-red · cream · BIG RED (queen) · cream · blush · small-red · leaf
 *
 * with a small ivory bud nestled at the top-left of the queen rose, and a leaf
 * peeking out behind the rightmost rose. The "queen" sits lowest with the
 * highest z so it's the focal point.
 */
const BOUQUET: Bloom[] = [
  { kind: "leaf", size: 70, lift: 28, rotate: -36, z: 5, offsetX: 14 },
  { kind: "rose", variant: "red", size: 80, lift: 36, rotate: -16, z: 14, withLeaves: true },
  { kind: "bud", variant: "ivory", size: 44, lift: 80, rotate: -20, z: 22, offsetX: 12 },
  { kind: "rose", variant: "ivory", size: 100, lift: 22, rotate: 8, z: 30, withLeaves: true },
  { kind: "rose", variant: "red", size: 154, lift: 0, rotate: 4, z: 60, withLeaves: true, goldTrim: true },
  { kind: "rose", variant: "ivory", size: 96, lift: 18, rotate: -8, z: 32, withLeaves: true },
  { kind: "rose", variant: "blush", size: 88, lift: 28, rotate: 12, z: 24, withLeaves: true },
  { kind: "bud", variant: "red", size: 50, lift: 64, rotate: 22, z: 18, offsetX: -8 },
  { kind: "rose", variant: "red", size: 76, lift: 38, rotate: 22, z: 14, withLeaves: true },
  { kind: "leaf", size: 78, lift: 22, rotate: 38, z: 5, flip: true, offsetX: -16 },
];

export default function RoseCluster({
  className = "",
  mirrored = false,
  goldTrim = true,
}: RoseClusterProps) {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className={`rose-cluster ${className}`}
      style={{ transform: mirrored ? "scaleX(-1)" : undefined }}
    >
      {BOUQUET.map((bloom, index) => {
        const initial = reduce
          ? { opacity: 0 }
          : { opacity: 0, y: 18, scale: 0.5 };
        const animate = reduce
          ? { opacity: 1 }
          : { opacity: 1, y: 0, scale: 1 };
        const delay = 0.06 * index;

        const flip = bloom.kind === "leaf" && bloom.flip;
        const rotateValue = flip
          ? `rotate(${bloom.rotate}deg) scaleX(-1)`
          : `rotate(${bloom.rotate}deg)`;
        const wrapperStyle: React.CSSProperties = {
          marginBottom: `${bloom.lift}px`,
          marginLeft: bloom.offsetX ? `${bloom.offsetX}px` : undefined,
          zIndex: bloom.z,
          ["--rose-rotate" as string]: rotateValue,
        };

        const dropShadow =
          bloom.kind === "leaf"
            ? "drop-shadow(0 8px 12px rgba(8, 24, 14, 0.45))"
            : bloom.variant === "ivory"
              ? "drop-shadow(0 12px 18px rgba(80, 40, 20, 0.32))"
              : bloom.variant === "blush"
                ? "drop-shadow(0 12px 18px rgba(80, 18, 32, 0.4))"
                : "drop-shadow(0 14px 22px rgba(20, 0, 8, 0.5))";

        return (
          <motion.div
            key={`${bloom.kind}-${index}`}
            className="rose-wrap"
            style={wrapperStyle}
            initial={initial}
            whileInView={animate}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.95,
              delay,
              ease: [0.22, 0.61, 0.36, 1],
            }}
          >
            {bloom.kind === "rose" && (
              <Rose
                variant={bloom.variant}
                size={bloom.size}
                seed={`${bloom.variant}-${index}`}
                withLeaves={bloom.withLeaves}
                goldTrim={bloom.goldTrim ?? goldTrim}
                style={{ filter: dropShadow }}
                className="rose-svg"
              />
            )}
            {bloom.kind === "bud" && (
              <RoseBud
                variant={bloom.variant}
                size={bloom.size}
                seed={`${bloom.variant}-bud-${index}`}
                style={{ filter: dropShadow }}
                className="rose-svg"
              />
            )}
            {bloom.kind === "leaf" && (
              <RoseLeaf
                size={bloom.size}
                seed={`leaf-${index}`}
                variant="single"
                style={{ filter: dropShadow }}
                className="rose-svg"
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
