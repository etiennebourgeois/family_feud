import type { Answer } from "../types";

interface AnswerCardProps {
  answer: Answer | undefined;
  index: number;
  isRevealed: boolean;
  onReveal?: () => void;
  showControls?: boolean;
}

export function AnswerCard({
  answer,
  index,
  isRevealed,
  onReveal,
  showControls = false,
}: AnswerCardProps) {
  const hasAnswer = answer !== undefined;

  return (
    <div className={`flip-card h-16 md:h-20 ${isRevealed ? "flipped" : ""}`}>
      <div className="flip-card-inner">
        {/* Front - Number only */}
        <div className="flip-card-front w-full h-full bg-gradient-to-b from-blue-700 to-blue-900 rounded-lg border-4 border-yellow-500 shadow-lg">
          <span
            className="text-4xl md:text-5xl font-bold text-yellow-400"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            {index + 1}
          </span>
        </div>

        {/* Back - Answer and points */}
        <div className="flip-card-back w-full h-full bg-gradient-to-b from-blue-600 to-blue-800 rounded-lg border-4 border-yellow-500 shadow-lg px-4">
          {hasAnswer ? (
            <div className="flex justify-between items-center w-full">
              <span
                className="text-xl md:text-2xl font-bold text-white uppercase tracking-wide"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
              >
                {answer.text}
              </span>
              <span
                className="text-2xl md:text-3xl font-bold text-yellow-400 ml-4"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
              >
                {answer.points}
              </span>
            </div>
          ) : (
            <span className="text-gray-400 text-xl">—</span>
          )}
        </div>
      </div>

      {/* Reveal button for host controls */}
      {showControls && hasAnswer && !isRevealed && (
        <button
          onClick={onReveal}
          className="absolute inset-0 w-full h-full opacity-0 hover:opacity-100 bg-black/30 rounded-lg flex items-center justify-center transition-opacity cursor-pointer"
        >
          <span className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold">
            Révéler
          </span>
        </button>
      )}
    </div>
  );
}
