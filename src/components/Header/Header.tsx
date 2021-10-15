import React from 'react';
import style from './Header.scss';

export interface HeaderProps {
  title: string;
  links: { link: string; text: string; onClick?: () => void }[];
}

export const Header: React.FC<HeaderProps> = ({ title, links }: HeaderProps): JSX.Element => {
  const items = links.map((item, index) => (
    <a href={item.link} key={index} onClick={item.onClick}>
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
