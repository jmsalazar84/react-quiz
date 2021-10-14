import React from 'react';
import style from './QuizResult.scss';
import { QuizQuestion } from '@common/services/Questions/genCountryInContinent';

interface QuizResultProps {
  quiz: QuizQuestion;
  answer: string;
  onClose: () => void;
}

export const QuizResult: React.FC<QuizResultProps> = ({ quiz, answer, onClose }: QuizResultProps): JSX.Element => {
  let title = 'Good!';
  let label = '';
  let description = '';
  let answerStyle = style.success;
  if (quiz) {
    if (answer !== quiz.correctAnswer) {
      title = 'Incorrect';
      label = 'Correct answer: ';
      description = quiz.correctAnswer;
      answerStyle = style.wrong;
    }
  }

  return quiz ? (
    <div className={`${style.quizResult} ${answerStyle}`}>
      <div className={style.content}>
        <h1>{title}</h1>
        <p>
          <b>{label}</b>
          {description}
        </p>
        <button onClick={onClose}>Continue</button>
      </div>
    </div>
  ) : (
    <></>
  );
};
