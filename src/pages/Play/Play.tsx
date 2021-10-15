import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import QuizResult from '@components/Quiz/QuizResult';
import Header from '@components/Header';
import QuizCard from '@components/Quiz/QuizCard';
import { QuizQuestion, Board } from '@common/interfaces';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { updateLeaderboard } from '@services/Leaderboard/updateLeaderboard';
import { QuizBuilder } from '@services/Questions';
import { Continent, Country } from '../../types';
import style from './Play.scss';

export const Play: React.FC = (): JSX.Element => {
  const [showResult, setShowResult] = useState(false);
  const [redirect, setRedirect] = useState(null);
  const [scored, setScored] = useState(0);
  const [maxQuestions] = useLocalStorage<number>('maxQuestions', 10);
  const [score, setScore] = useLocalStorage<number>('score', 0);
  const [answer, setAnswer] = useLocalStorage<string>('answer', '');
  const [nickname] = useLocalStorage<string>('nickname', '');
  const [currentQuestion, setCurrentQuestion] = useLocalStorage<number>('currentQuestion', 1);
  const [canResponse, setCanResponse] = useState(false);
  const [leaderboard, setLeaderboard] = useLocalStorage<Board[]>('leaderboard', []);
  const [countries] = useLocalStorage<Country[]>('countries', []);
  const [continents] = useLocalStorage<Continent[]>('continents', []);
  const [quiz, setQuiz] = useState<QuizQuestion>(QuizBuilder({ countries, continents }));

  const onSelect = (currentAnswer: string, points: number) => {
    setScored(points);
    setAnswer(currentAnswer);
    setCanResponse(true);
  };

  const onResultClosed = () => {
    setShowResult(false);

    const isLastQuestion = maxQuestions - currentQuestion === 0;
    if (isLastQuestion) {
      finish();
    } else {
      nextQuestion();
    }
  };

  const onContinue = () => {
    setShowResult(true);
  };

  const onQuit = (): void => {
    setScore(0);
    setScored(0);
    setCurrentQuestion(1);
    setRedirect('/');
  };

  const nextQuestion = () => {
    const newScore = score + scored;
    setScore(newScore);
    setCanResponse(false);
    setQuiz(QuizBuilder({ countries, continents }));
    setCurrentQuestion(currentQuestion + 1);
  };

  const finish = () => {
    const newScore = score + scored;
    setScore(0);
    setScored(0);
    setCurrentQuestion(1);
    setLeaderboard(updateLeaderboard([...leaderboard], { nickname, score: newScore }));
    setRedirect('/leaderboard');
  };

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <>
      <div className={style.layout}>
        <div className={style.header}>
          <Header title="WorldQuiz" links={[{ link: '/', text: 'Quit', onClick: onQuit }]} />
        </div>
        <div className={style.content}>
          <QuizCard quiz={quiz} onSelect={onSelect} currentQuestion={currentQuestion} maxQuestions={maxQuestions} />
          {showResult ? <QuizResult quiz={quiz} answer={answer} onClose={onResultClosed} /> : <></>}
        </div>

        <div className={style.footer}>
          <div className={style.bottomBar}>
            <div>
              Score: <b>{score}</b>
            </div>

            <div>
              <button className={style.PrimaryButton} disabled={!canResponse} onClick={onContinue}>
                CONTINUE
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
