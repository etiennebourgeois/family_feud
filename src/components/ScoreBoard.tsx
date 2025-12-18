import type { Team } from "../types";

interface ScoreBoardProps {
  teams: [Team, Team];
  activeTeam: 0 | 1;
  roundScore: number;
}

export function ScoreBoard({ teams, activeTeam, roundScore }: ScoreBoardProps) {
  return (
    <div className="flex justify-between items-center gap-4 w-full">
      {/* Team 1 */}
      <div
        className={`flex-1 p-4 rounded-lg border-4 transition-all ${
          activeTeam === 0
            ? "border-yellow-400 bg-blue-700/50"
            : "border-blue-600 bg-blue-900/50"
        }`}
      >
        <h3
          className="text-xl md:text-2xl text-center text-white font-bold truncate"
          style={{ fontFamily: "Bebas Neue, sans-serif" }}
        >
          {teams[0].name}
        </h3>
        <p
          className="text-4xl md:text-5xl text-center text-yellow-400 font-bold"
          style={{ fontFamily: "Bebas Neue, sans-serif" }}
        >
          {teams[0].score}
        </p>
      </div>

      {/* Round Score */}
      <div className="flex flex-col items-center">
        <span
          className="text-sm text-blue-300 uppercase tracking-wider"
          style={{ fontFamily: "Bebas Neue, sans-serif" }}
        >
          Manche
        </span>
        <div className="bg-yellow-500 px-6 py-3 rounded-lg">
          <span
            className="text-4xl md:text-5xl font-bold text-blue-900"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            {roundScore}
          </span>
        </div>
      </div>

      {/* Team 2 */}
      <div
        className={`flex-1 p-4 rounded-lg border-4 transition-all ${
          activeTeam === 1
            ? "border-yellow-400 bg-blue-700/50"
            : "border-blue-600 bg-blue-900/50"
        }`}
      >
        <h3
          className="text-xl md:text-2xl text-center text-white font-bold truncate"
          style={{ fontFamily: "Bebas Neue, sans-serif" }}
        >
          {teams[1].name}
        </h3>
        <p
          className="text-4xl md:text-5xl text-center text-yellow-400 font-bold"
          style={{ fontFamily: "Bebas Neue, sans-serif" }}
        >
          {teams[1].score}
        </p>
      </div>
    </div>
  );
}
