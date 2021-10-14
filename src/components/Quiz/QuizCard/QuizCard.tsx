import { QuizQuestion } from 'src/common/services/Questions/genCountryInContinent';
import React, { useState } from 'react';
import style from './QuizCard.scss';

interface QuizCardProps {
  quiz: QuizQuestion;
  currentQuestion: number;
  maxQuestions: number;
  onSelect: (answer: string, points: number) => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  quiz,
  currentQuestion,
  maxQuestions,
  onSelect,
}: QuizCardProps): JSX.Element => {
  const [answer, setAnswer] = useState('');

  const handleClick = (value: string) => {
    setAnswer(value);
    const points = quiz.correctAnswer === value ? quiz.points : 0;
    onSelect(value, points);
  };

  return quiz ? (
    <div className={style.card}>
      <div className={style.question}>{quiz.question}</div>
      <ul className={style.alternatives}>
        {quiz.alternatives.map((value: string, index: number) => (
          <li
            key={index}
            onClick={() => {
              handleClick(value);
            }}
            className={value === answer ? style.selected : style.unselected}
          >
            <div>{value}</div>
          </li>
        ))}
      </ul>
      <div className={style.step}>
        Question {currentQuestion} / {maxQuestions}
      </div>
    </div>
  ) : (
    <></>
  );
};
