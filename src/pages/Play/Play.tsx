import React, { useState } from 'react';
import QuizCard from '@components/Quiz/QuizCard';
import { Redirect } from 'react-router';

import { useQuery } from '@apollo/client';
import { Query } from 'src/types';
import { GET_CONTINENTS_AND_COUNTRIES } from '../../graphql';
import { genQuiz, QuizQuestion } from '../../services/Questions/genCountryInContinent';

import style from './Play.scss';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { Board } from '../../common/interfaces/Board';
import { updateLeaderboard } from '../../services/Leaderboard/updateLeaderboard';
import QuizResult from '@components/Quiz/QuizResult';
import Header from '@components/Header';

export const Play: React.FC = (): JSX.Element => {
  const [showResult, setShowResult] = useState(false);

  const [redirect, setRedirect] = useState(null);
  const [scored, setScored] = useState(0);
  const [maxQuestions] = useLocalStorage<number>('maxQuestions', 10);
  const [score, setScore] = useLocalStorage<number>('score', 0);
  const [answer, setAnswer] = useLocalStorage<string>('answer', '');
  const [nickname] = useLocalStorage<string>('nickname', '');
  const [currentQuestion, setCurrentQuestion] = useLocalStorage<number>('currentQuestion', 1);
  const [quiz, setQuiz] = useState<QuizQuestion>(undefined);
  const [countries, setCountries] = useState([]);
  const [continents, setContinents] = useState([]);
  const [canResponse, setCanResponse] = useState(false);
  const [leaderboard, setLeaderboard] = useLocalStorage<Board[]>('leaderboard', []);

  useQuery<Query>(GET_CONTINENTS_AND_COUNTRIES, {
    onCompleted: (data) => {
      setContinents(data.continents);
      setCountries(data.countries);
      setQuiz(genQuiz(data.countries, data.continents));
    },
    fetchPolicy: 'cache-first',
  });

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

  const onQuit = () => {
    setScore(0);
    setScored(0);
    setCurrentQuestion(1);
    setRedirect('/');
  };

  const nextQuestion = () => {
    const newScore = score + scored;
    setScore(newScore);
    setCanResponse(false);
    setQuiz(genQuiz(countries, continents));
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
          <Header title="WorldQuiz" links={[{ link: '/', text: 'Quit' }]} />
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
