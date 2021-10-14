import React, { useRef, useState } from 'react';
import { Redirect } from 'react-router';
import { useLocalStorage } from '@hooks/index';
import style from './Home.scss';
import { config } from '../../configs';

export const Home: React.FC = (): JSX.Element => {
  const [redirect, setRedirect] = useState(null);
  const [nickname, setNickname] = useLocalStorage('nickname', '');
  const [score, setScore] = useLocalStorage('score', 0);
  const [currentQuestion, setCurrentQuestion] = useLocalStorage('currentQuestion', 1);
  const [error, setError] = useState('');

  const domRef = {
    nickname: useRef<HTMLInputElement>(),
  };

  const play = () => {
    console.log({ nickname });
    if (nickname === '') {
      setError('Please enter your nickname');
      domRef.nickname.current?.focus();
      return;
    }

    setScore(0);
    setCurrentQuestion(0);
    setRedirect('/play');
  };

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <div className={style.Layout}>
      <div className={style.Header}></div>
      <div className={style.Content}>
        <div className={style.Home}>
          <div className={style.World} />
          <h1>How well do you know the world?</h1>
          <input
            ref={domRef.nickname}
            type="text"
            value={nickname}
            placeholder="Enter your nickname"
            onChange={(e) => setNickname(e.target.value)}
          />

          <button className={style.PrimaryButton} onClick={play}>
            PLAY
          </button>

          <div className={style.msgError}>{error}</div>
        </div>
      </div>
      <div className={style.Footer}>
        Developed by <a href={config.author.url}>{config.author.name}</a>
      </div>
    </div>
  );
};
