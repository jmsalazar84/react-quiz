import { QuizQuestion } from '@common/interfaces';
import { randomIntFromInterval } from '@utils/randomIntFromInterval';
import { shuffle } from '@utils/shuffle';
import { Continent, Country } from '../../types';

export const WhatContinentIsCountryIn = (countries: Country[], continents: Continent[]): QuizQuestion | undefined => {
  if (countries.length === 0 || continents.length === 0) {
    return undefined;
  }

  const countryIndex = randomIntFromInterval(0, countries.length - 1);
  const country = countries[countryIndex];
  const question = `What continent is ${country.name} in?`;
  const correctAnswer = country.continent.name;
  const incorrectAnswers = continents
    .filter((value) => value.code !== country.continent.code)
    .map((continent) => continent.name)
    .splice(0, 3);
  const alternatives = shuffle<string>([correctAnswer, ...incorrectAnswers]);

  return {
    question,
    points: 1,
    correctAnswer,
    incorrectAnswers,
    alternatives,
  };
};
