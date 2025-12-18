import { useState } from "react";
import { Link } from "react-router-dom";
import { useGameState } from "../hooks/useGameState";
import {
  playCorrectSound,
  playStrikeSound,
  playWinSound,
  playRevealSound,
} from "../utils/sounds";

export function HostPage() {
  const { state, dispatch } = useGameState();
  const [editingTeam, setEditingTeam] = useState<0 | 1 | null>(null);
  const [teamNameInput, setTeamNameInput] = useState("");

  const currentQuestion = state.questions[state.currentQuestionIndex];
  const answers = currentQuestion?.answers || [];

  const handleRevealAnswer = (index: number) => {
    if (!state.revealedAnswers[index] && answers[index]) {
      playRevealSound();
      setTimeout(() => playCorrectSound(), 300);
      dispatch({ type: "REVEAL_ANSWER", index });
    }
  };

  const handleAddStrike = () => {
    if (state.strikes < 3) {
      playStrikeSound();
      dispatch({ type: "ADD_STRIKE" });
    }
  };

  const handleAwardPoints = (team: 0 | 1) => {
    playWinSound();
    dispatch({ type: "AWARD_POINTS", team });
  };

  const handleEditTeamName = (team: 0 | 1) => {
    setEditingTeam(team);
    setTeamNameInput(state.teams[team].name);
  };

  const handleSaveTeamName = () => {
    if (editingTeam !== null) {
      dispatch({
        type: "UPDATE_TEAM_NAME",
        team: editingTeam,
        name: teamNameInput,
      });
      setEditingTeam(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1
            className="text-3xl font-bold text-yellow-400"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            Panneau de Contrôle
          </h1>
          <div className="flex gap-2">
            <Link
              to="/game"
              target="_blank"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
            >
              Ouvrir l'écran de jeu
            </Link>
            <Link
              to="/admin"
              className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg"
            >
              Admin
            </Link>
          </div>
        </div>

        {/* Current Question */}
        <div className="bg-blue-800 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-blue-300">
              Question {state.currentQuestionIndex + 1} /{" "}
              {state.questions.length}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => dispatch({ type: "PREVIOUS_QUESTION" })}
                disabled={state.currentQuestionIndex === 0}
                className="bg-gray-600 hover:bg-gray-700 disabled:opacity-50 px-3 py-1 rounded"
              >
                ← Précédent
              </button>
              <button
                onClick={() => dispatch({ type: "NEXT_QUESTION" })}
                disabled={
                  state.currentQuestionIndex === state.questions.length - 1
                }
                className="bg-gray-600 hover:bg-gray-700 disabled:opacity-50 px-3 py-1 rounded"
              >
                Suivant →
              </button>
            </div>
          </div>
          <p className="text-xl font-bold">{currentQuestion?.question}</p>
        </div>

        {/* Teams */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[0, 1].map((teamIndex) => (
            <div
              key={teamIndex}
              className={`bg-gray-800 rounded-lg p-4 border-2 ${
                state.activeTeam === teamIndex
                  ? "border-yellow-400"
                  : "border-gray-600"
              }`}
            >
              {editingTeam === teamIndex ? (
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={teamNameInput}
                    onChange={(e) => setTeamNameInput(e.target.value)}
                    className="flex-1 bg-gray-700 px-2 py-1 rounded"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveTeamName}
                    className="bg-green-600 px-3 py-1 rounded"
                  >
                    ✓
                  </button>
                </div>
              ) : (
                <h3
                  className="text-xl font-bold mb-2 cursor-pointer hover:text-yellow-400"
                  onClick={() => handleEditTeamName(teamIndex as 0 | 1)}
                >
                  {state.teams[teamIndex].name} ✏️
                </h3>
              )}
              <p className="text-3xl font-bold text-yellow-400 mb-4">
                {state.teams[teamIndex].score} pts
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    dispatch({
                      type: "SET_ACTIVE_TEAM",
                      team: teamIndex as 0 | 1,
                    })
                  }
                  className={`flex-1 py-2 rounded ${
                    state.activeTeam === teamIndex
                      ? "bg-yellow-600"
                      : "bg-gray-600 hover:bg-gray-700"
                  }`}
                >
                  Actif
                </button>
                <button
                  onClick={() => handleAwardPoints(teamIndex as 0 | 1)}
                  className="flex-1 bg-green-600 hover:bg-green-700 py-2 rounded"
                  disabled={state.roundScore === 0}
                >
                  +{state.roundScore} pts
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Round Score & Strikes */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 bg-gray-800 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-400 mb-1">Score de la manche</p>
            <p className="text-4xl font-bold text-yellow-400">
              {state.roundScore}
            </p>
          </div>
          <div className="flex-1 bg-gray-800 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-2 text-center">Strikes</p>
            <div className="flex justify-center gap-2 mb-2">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`text-3xl ${
                    i < state.strikes ? "text-red-500" : "text-gray-600"
                  }`}
                >
                  ✗
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddStrike}
                disabled={state.strikes >= 3}
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 py-2 rounded"
              >
                + Strike
              </button>
              <button
                onClick={() => dispatch({ type: "CLEAR_STRIKES" })}
                className="flex-1 bg-gray-600 hover:bg-gray-700 py-2 rounded"
              >
                Effacer
              </button>
            </div>
          </div>
        </div>

        {/* Answers Grid */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-bold mb-4">Réponses</h3>
          <div className="grid grid-cols-2 gap-3">
            {answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleRevealAnswer(index)}
                disabled={state.revealedAnswers[index]}
                className={`p-3 rounded-lg text-left transition-all ${
                  state.revealedAnswers[index]
                    ? "bg-green-800 cursor-default"
                    : "bg-blue-700 hover:bg-blue-600 cursor-pointer"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold">
                    {index + 1}. {answer.text}
                  </span>
                  <span className="text-yellow-400 font-bold">
                    {answer.points}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4">
          <button
            onClick={() => dispatch({ type: "RESET_ROUND" })}
            className="flex-1 bg-orange-600 hover:bg-orange-700 py-3 rounded-lg"
          >
            Réinitialiser la manche
          </button>
          <button
            onClick={() => {
              if (
                confirm("Êtes-vous sûr de vouloir réinitialiser tout le jeu?")
              ) {
                dispatch({ type: "RESET_GAME" });
              }
            }}
            className="flex-1 bg-red-800 hover:bg-red-900 py-3 rounded-lg"
          >
            Réinitialiser le jeu
          </button>
        </div>
      </div>
    </div>
  );
}
