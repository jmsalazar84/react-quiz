import LeaderBoard from '@pages/Leaderboard';
import Home from '@pages/Home';
import Play from '@pages/Play';

export const routes = [
  {
    component: Home,
    exact: true,
    path: '/',
  },
  {
    component: Play,
    exact: true,
    path: '/play',
  },
  {
    component: LeaderBoard,
    exact: true,
    path: '/leaderboard',
  },
];
