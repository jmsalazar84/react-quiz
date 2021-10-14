import { shuffle } from '@utils/index';

describe('Util shuffle', () => {
  test('Suffle should returns the same array unordered', () => {
    const orderedNumbers = Array.from(Array(10).keys());
    const unorderedNumbers = shuffle(orderedNumbers);

    expect(unorderedNumbers).toHaveLength(orderedNumbers.length);
  });
});
