import React from 'react';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { Board } from '@common/interfaces/Board';
import Header from '@components/Header';
import style from './Leaderboard.scss';

export const Leaderboard: React.FC = (): JSX.Element => {
  const [board] = useLocalStorage<Board[]>('leaderboard', []);

  const items = board.map((item: Board, index: number) => (
    <li key={index}>
      <div>{1 + index}</div>
      <div>{item.nickname}</div>
      <div>{item.score} points</div>
    </li>
  ));

  return (
    <div className={style.layout}>
      <div className={style.header}>
        <Header title="Leaderboard" links={[{ link: '/', text: 'Play' }]} />
      </div>
      <div className={style.content}>
        <div className={style.leaderboard}>
          <ul>{items}</ul>
        </div>
      </div>
      <div className={style.footer}></div>
    </div>
  );
};
