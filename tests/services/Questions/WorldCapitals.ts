import { WorldCapitals } from '@services/Questions/index';
import { Country } from '../../../src/types';

describe('Services WorldCapitals', () => {
  test('should do nothing when countries is empty', () => {
    const countries = [] as Country[];
    const quizQuestion = WorldCapitals(countries);
    expect(quizQuestion).toBeUndefined();
  });

  test('should create a quiz', () => {
    const countries = [
      {
        name: 'Andorra',
        code: 'AD',
        capital: 'Andorra la Vella',
        continent: {
          code: 'EU',
          name: 'Europe',
        },
      },
      {
        name: 'United Arab Emirates',
        code: 'AE',
        capital: 'Abu Dhabi',
        continent: {
          code: 'AS',
          name: 'Asia',
        },
      },
      {
        name: 'Afghanistan',
        code: 'AF',
        capital: 'Kabul',
        continent: {
          code: 'AS',
          name: 'Asia',
        },
      },
      {
        name: 'Antigua and Barbuda',
        code: 'AG',
        capital: "Saint John's",
        continent: {
          code: 'NA',
          name: 'North America',
        },
      },
    ] as Country[];
    const quizQuestion = WorldCapitals(countries);
    expect(quizQuestion).toBeDefined();
    expect(quizQuestion.alternatives).toHaveLength(4);
    expect(quizQuestion.points).toBeGreaterThanOrEqual(1);
    expect(quizQuestion.correctAnswer).toBeDefined();
    expect(quizQuestion.incorrectAnswers).toHaveLength(3);

  });
});
