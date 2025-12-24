export interface Answer {
  text: string;
  points: number;
}

export interface Question {
  id: string;
  question: string;
  answers: Answer[];
}

export interface Team {
  name: string;
  score: number;
}

export interface GameState {
  questions: Question[];
  currentQuestionIndex: number;
  revealedAnswers: boolean[];
  teams: [Team, Team];
  strikes: number;
  roundScore: number;
  activeTeam: 0 | 1;
  gamePhase: "intro" | "idle" | "playing" | "faceoff" | "steal" | "roundEnd";
}

export type GameAction =
  | { type: "REVEAL_ANSWER"; index: number }
  | { type: "ADD_STRIKE" }
  | { type: "CLEAR_STRIKES" }
  | { type: "AWARD_POINTS"; team: 0 | 1 }
  | { type: "NEXT_QUESTION" }
  | { type: "PREVIOUS_QUESTION" }
  | { type: "SET_QUESTION"; index: number }
  | { type: "SET_ACTIVE_TEAM"; team: 0 | 1 }
  | { type: "SET_PHASE"; phase: GameState["gamePhase"] }
  | { type: "RESET_ROUND" }
  | { type: "RESET_GAME" }
  | { type: "UPDATE_TEAM_SCORE"; team: 0 | 1; score: number }
  | { type: "UPDATE_TEAM_NAME"; team: 0 | 1; name: string }
  | { type: "LOAD_QUESTIONS"; questions: Question[] }
  | { type: "SYNC_STATE"; state: GameState };
