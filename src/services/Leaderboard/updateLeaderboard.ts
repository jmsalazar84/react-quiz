import { Board } from '../../common/interfaces/Board';

export const updateLeaderboard = (leaderboard: Board[], data: Board): Board[] => {
  
  const {nickname, score} = data;
  const found = leaderboard.findIndex((value) => value.nickname === nickname);
  if (found > -1) {
    leaderboard[found].score = score;
  } else {
    leaderboard.push({nickname, score});
  }
  leaderboard.sort((a, b) => b.score-a.score);
  return leaderboard;
};
