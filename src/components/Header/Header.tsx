import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Header.scss';

export interface HeaderProps {
  title: string;
  links: { link: string; text: string }[];
}

export const Header: React.FC<HeaderProps> = ({ title, links }: HeaderProps): JSX.Element => {
  const items = links.map((item, index) => (
    <a href={item.link} key={index}>
      {item.text}
    </a>
  ));
  return (
    <div className={style.header}>
      <div className={style.title}>{title}</div>
      <div className={style.links}>{items}</div>
    </div>
  );
};
