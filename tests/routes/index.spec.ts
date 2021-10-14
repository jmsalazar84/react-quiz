import Home from '@pages/Home';
import LeaderBoard from '@pages/Leaderboard';
import Play from '@pages/Play';
import { routes } from '@routes/index';

const pathMap = {} as any;

describe('Routes', () => {
  beforeAll(() => {
    routes.forEach((item) => {
      pathMap[item.path] = item;
    });
  });

  test('/ path should be defined', () => {
    expect(pathMap).toHaveProperty('/');
    const { component, exact } = pathMap['/'];
    expect(exact).toBeTruthy();
    expect(component).toBe(Home);
  });

  test('/play path should be defined', () => {
    expect(pathMap).toHaveProperty('/play');
    const { component, exact } = pathMap['/play'];
    expect(exact).toBeTruthy();
    expect(component).toBe(Play);
  });

  test('/leaderboard path should be defined', () => {
    expect(pathMap).toHaveProperty('/leaderboard');
    const { component, exact } = pathMap['/leaderboard'];
    expect(exact).toBeTruthy();
    expect(component).toBe(LeaderBoard);
  });
});
