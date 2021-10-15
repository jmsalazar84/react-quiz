export interface QuizQuestion {
  question: string;
  points: number;
  correctAnswer: string;
  incorrectAnswers: string[];
  alternatives: string[];
}
