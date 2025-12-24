import { useReducer, useEffect, useCallback } from "react";
import type { GameState, GameAction, Question } from "../types";
import defaultQuestions from "../data/questions.json";

const STORAGE_KEY = "family-feud-game-state";
const QUESTIONS_STORAGE_KEY = "family-feud-questions";

const getInitialQuestions = (): Question[] => {
  const stored = localStorage.getItem(QUESTIONS_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultQuestions.questions;
    }
  }
  return defaultQuestions.questions;
};

const createInitialState = (questions: Question[]): GameState => ({
  questions,
  currentQuestionIndex: -1,
  revealedAnswers: new Array(5).fill(false),
  teams: [
    { name: "Équipe 1", score: 0 },
    { name: "Équipe 2", score: 0 },
  ],
  strikes: 0,
  roundScore: 0,
  activeTeam: 0,
  gamePhase: "intro",
});

const getInitialState = (): GameState => {
  const stored = localStorage.getItem(STORAGE_KEY);
  const questions = getInitialQuestions();

  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Ensure questions are up to date
      return { ...parsed, questions };
    } catch {
      return createInitialState(questions);
    }
  }
  return createInitialState(questions);
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "REVEAL_ANSWER": {
      const newRevealed = [...state.revealedAnswers];
      newRevealed[action.index] = true;
      const currentQuestion = state.questions[state.currentQuestionIndex];
      const points = currentQuestion?.answers[action.index]?.points || 0;
      return {
        ...state,
        revealedAnswers: newRevealed,
        roundScore: state.roundScore + points,
      };
    }

    case "ADD_STRIKE":
      return {
        ...state,
        strikes: Math.min(state.strikes + 1, 3),
      };

    case "CLEAR_STRIKES":
      return {
        ...state,
        strikes: 0,
      };

    case "AWARD_POINTS": {
      const newTeams = [...state.teams] as [
        (typeof state.teams)[0],
        (typeof state.teams)[1]
      ];
      newTeams[action.team] = {
        ...newTeams[action.team],
        score: newTeams[action.team].score + state.roundScore,
      };
      return {
        ...state,
        teams: newTeams,
        roundScore: 0,
        gamePhase: "roundEnd",
      };
    }

    case "NEXT_QUESTION": {
      const nextIndex = Math.min(
        state.currentQuestionIndex + 1,
        state.questions.length - 1
      );
      return {
        ...state,
        currentQuestionIndex: nextIndex,
        revealedAnswers: new Array(5).fill(false),
        strikes: 0,
        roundScore: 0,
        gamePhase: "playing",
      };
    }

    case "PREVIOUS_QUESTION": {
      const prevIndex = Math.max(state.currentQuestionIndex - 1, 0);
      return {
        ...state,
        currentQuestionIndex: prevIndex,
        revealedAnswers: new Array(5).fill(false),
        strikes: 0,
        roundScore: 0,
        gamePhase: "playing",
      };
    }

    case "SET_QUESTION":
      return {
        ...state,
        currentQuestionIndex: action.index,
        revealedAnswers: new Array(5).fill(false),
        strikes: 0,
        roundScore: 0,
        gamePhase: "playing",
      };

    case "SET_ACTIVE_TEAM":
      return {
        ...state,
        activeTeam: action.team,
      };

    case "SET_PHASE":
      return {
        ...state,
        gamePhase: action.phase,
      };

    case "RESET_ROUND":
      return {
        ...state,
        revealedAnswers: new Array(5).fill(false),
        strikes: 0,
        roundScore: 0,
        gamePhase: "idle",
      };

    case "RESET_GAME":
      return createInitialState(state.questions);

    case "UPDATE_TEAM_SCORE": {
      const newTeams = [...state.teams] as [
        (typeof state.teams)[0],
        (typeof state.teams)[1]
      ];
      newTeams[action.team] = {
        ...newTeams[action.team],
        score: action.score,
      };
      return {
        ...state,
        teams: newTeams,
      };
    }

    case "UPDATE_TEAM_NAME": {
      const newTeams = [...state.teams] as [
        (typeof state.teams)[0],
        (typeof state.teams)[1]
      ];
      newTeams[action.team] = {
        ...newTeams[action.team],
        name: action.name,
      };
      return {
        ...state,
        teams: newTeams,
      };
    }

    case "LOAD_QUESTIONS":
      localStorage.setItem(
        QUESTIONS_STORAGE_KEY,
        JSON.stringify(action.questions)
      );
      return {
        ...state,
        questions: action.questions,
        currentQuestionIndex: 0,
        revealedAnswers: new Array(5).fill(false),
      };

    case "SYNC_STATE":
      return action.state;

    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, null, getInitialState);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Listen for storage events from other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const newState = JSON.parse(e.newValue);
          dispatch({ type: "SYNC_STATE", state: newState });
        } catch {
          // Ignore parse errors
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Broadcast state changes to other tabs
  const broadcastState = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    // Trigger storage event manually for same-window updates
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: STORAGE_KEY,
        newValue: JSON.stringify(state),
      })
    );
  }, [state]);

  return { state, dispatch, broadcastState };
}

export function getStoredQuestions(): Question[] {
  return getInitialQuestions();
}

export function saveQuestions(questions: Question[]) {
  localStorage.setItem(QUESTIONS_STORAGE_KEY, JSON.stringify(questions));
}
