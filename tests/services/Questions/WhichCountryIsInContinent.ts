import { WhichCountryIsInContinent } from '@services/Questions/index';
import { Continent, Country } from '../../../src/types';

describe('Services WhichCountryIsInContinent', () => {
  test('should do nothing when countries and continents are empty', () => {
    const countries = [] as Country[];
    const continents = [] as Continent[];
    const quizQuestion = WhichCountryIsInContinent(countries, continents);
    expect(quizQuestion).toBeUndefined();
  });
});
