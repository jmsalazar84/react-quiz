import { randomIntFromInterval } from '@utils/index';

describe('Util randomIntFromInterval', () => {
  test('Random number generator returns a number between the given range', () => {
    const min = 0;
    const max = 10;
    const randomNumber = randomIntFromInterval(min, max);

    expect(randomNumber).toBeGreaterThanOrEqual(min);
    expect(randomNumber).toBeLessThanOrEqual(max);
  });
});
