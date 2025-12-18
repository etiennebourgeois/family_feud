interface StrikeDisplayProps {
  strikes: number;
  maxStrikes?: number;
}

export function StrikeDisplay({ strikes, maxStrikes = 3 }: StrikeDisplayProps) {
  return (
    <div className="flex justify-center gap-4">
      {Array.from({ length: maxStrikes }).map((_, i) => (
        <div
          key={i}
          className={`w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-lg border-4 ${
            i < strikes
              ? "border-red-500 bg-red-900/50"
              : "border-gray-600 bg-gray-800/50"
          }`}
        >
          {i < strikes && (
            <span
              className="text-5xl md:text-6xl font-bold text-red-500 strike-x"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              ✗
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
