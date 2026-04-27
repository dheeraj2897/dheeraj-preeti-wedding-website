type PetalFieldProps = {
  variant?: "red" | "ivory";
  count?: number;
  className?: string;
};

export default function PetalField({
  variant = "red",
  count = 12,
  className = "",
}: PetalFieldProps) {
  const petals = Array.from({ length: count }, (_, index) => {
    const left = 6 + ((index * 8.5) % 88);
    const duration = 11 + (index % 5) * 1.8;
    const delay = -(index * 1.35);
    const size = 14 + (index % 4) * 4;

    return {
      left,
      duration,
      delay,
      size,
      opacity: 0.45 + (index % 3) * 0.12,
    };
  });

  return (
    <div aria-hidden className={`petal-field ${className}`}>
      {petals.map((petal, index) => (
        <span
          key={index}
          className={`petal ${variant === "ivory" ? "petal-ivory" : ""}`}
          style={{
            left: `${petal.left}%`,
            width: `${petal.size}px`,
            height: `${petal.size * 1.3}px`,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            opacity: petal.opacity,
          }}
        />
      ))}
    </div>
  );
}
