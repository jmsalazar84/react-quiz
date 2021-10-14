import { updateLeaderboard } from '@services/Leaderboard/index';
import { Board } from '@common/interfaces/Board';


describe('Services Leaderboard', () => {
  test('should add one item to leaderboard', () => {
    const leaderboard = [] as Board[];
    const data = {
      nickname: 'user-test',
      score: 0,
    } as Board;
    updateLeaderboard(leaderboard, data);
    expect(leaderboard).toHaveLength(1);
    expect(leaderboard[0].nickname).toEqual(data.nickname);
    expect(leaderboard[0].score).toEqual(data.score);

  });

  test('should update score by username', () => {
    const leaderboard = [] as Board[];

    updateLeaderboard(leaderboard, {
      nickname: 'user-test',
      score: 0,
    });

    expect(leaderboard).toHaveLength(1);
    expect(leaderboard[0].nickname).toEqual('user-test');
    expect(leaderboard[0].score).toEqual(0);

    updateLeaderboard(leaderboard, {
      nickname: 'user-test',
      score: 1,
    });

    expect(leaderboard).toHaveLength(1);
    expect(leaderboard[0].nickname).toEqual('user-test');
    expect(leaderboard[0].score).toEqual(1);
    
  });
});
