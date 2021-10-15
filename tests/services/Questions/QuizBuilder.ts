import { QuizBuilder } from '@services/Questions/index';
import { Continent, Country } from '../../../src/types';

describe('Services quizBuilder', () => {
  test('should do nothing when countries and continents are empty', () => {
    const countries = [] as Country[];
    const continents = [] as Continent[];
    const quizQuestion = QuizBuilder({countries, continents});
    expect(quizQuestion).toBeUndefined();
  });
});
