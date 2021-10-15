import { WhatContinentIsCountryIn } from '@services/Questions/index';
import { Continent, Country } from '../../../src/types';

describe('Services WhatContinentIsCountryIn', () => {
  test('should do nothing when countries and continents are empty', () => {
    const countries = [] as Country[];
    const continents = [] as Continent[];
    const quizQuestion = WhatContinentIsCountryIn(countries, continents);
    expect(quizQuestion).toBeUndefined();
  });
});
