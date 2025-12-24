import type { GameState } from "../types";
import { AnswerCard } from "./AnswerCard";
import { ScoreBoard } from "./ScoreBoard";
import { StrikeDisplay } from "./StrikeDisplay";

interface GameBoardProps {
  state: GameState;
}

export function GameBoard({ state }: GameBoardProps) {
  const currentQuestion = state.questions[state.currentQuestionIndex];
  const answers = currentQuestion?.answers || [];

  // Pad answers to 5 slots
  const paddedAnswers = [...answers].slice(0, 5);
  while (paddedAnswers.length < 5) {
    paddedAnswers.push(undefined as never);
  }

  // Split into two columns (3 left, 2 right)
  const leftColumn = paddedAnswers.slice(0, 3);
  const rightColumn = paddedAnswers.slice(3, 5);

  // Intro screen - show only scoreboard without question
  if (state.gamePhase === "intro") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1e3a5f] to-[#0f1f33] p-4 md:p-8 flex flex-col items-center justify-center">
        {/* Header / Logo */}
        <div className="text-center mb-12">
          <h1
            className="text-6xl md:text-8xl font-bold text-yellow-400 drop-shadow-lg"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            La Guerre des clans
          </h1>
        </div>

        {/* Score Board */}
        <div className="w-full max-w-4xl">
          <ScoreBoard
            teams={state.teams}
            activeTeam={state.activeTeam}
            roundScore={state.roundScore}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1e3a5f] to-[#0f1f33] p-4 md:p-8 flex flex-col">
      {/* Header / Logo */}
      <div className="text-center mb-6">
        <h1
          className="text-4xl md:text-6xl font-bold text-yellow-400 drop-shadow-lg"
          style={{ fontFamily: "Bebas Neue, sans-serif" }}
        >
          La Guerre des clans
        </h1>
      </div>

      {/* Question */}
      <div className="bg-blue-800/50 rounded-xl p-4 mb-6 border-4 border-yellow-500">
        <p
          className="text-2xl md:text-3xl text-center text-white font-bold"
          style={{ fontFamily: "Bebas Neue, sans-serif" }}
        >
          {currentQuestion?.question || "Pas de question sélectionnée"}
        </p>
      </div>

      {/* Score Board */}
      <div className="mb-6">
        <ScoreBoard
          teams={state.teams}
          activeTeam={state.activeTeam}
          roundScore={state.roundScore}
        />
      </div>

      {/* Answer Board */}
      <div className="flex-1 grid grid-cols-2 gap-4 mb-6">
        {/* Left Column */}
        <div className="space-y-3">
          {leftColumn.map((answer, i) => (
            <AnswerCard
              key={i}
              answer={answer}
              index={i}
              isRevealed={state.revealedAnswers[i]}
            />
          ))}
        </div>

        {/* Right Column */}
        <div className="space-y-3">
          {rightColumn.map((answer, i) => (
            <AnswerCard
              key={i + 3}
              answer={answer}
              index={i + 3}
              isRevealed={state.revealedAnswers[i + 3]}
            />
          ))}
        </div>
      </div>

      {/* Strikes */}
      <div className="mt-auto">
        <StrikeDisplay strikes={state.strikes} />
      </div>
    </div>
  );
}
