import { ValidContinentFilter } from '@common/filters';
import { QuizQuestion } from '@common/interfaces/QuizQuestion';
import { Continent, Country } from '../../types';
import { shuffle, randomIntFromInterval } from '../../utils';

export const WhichCountryIsInContinent = (countries: Country[], continents: Continent[]): QuizQuestion | undefined => {
  if (countries.length === 0 || continents.length === 0) {
    return undefined;
  }
  const validContinents = continents.filter(ValidContinentFilter);
  const continentIndex = randomIntFromInterval(0, validContinents.length - 1);
  const continent = validContinents[continentIndex];

  const validCountries = countries.filter((value) => value.continent.code === continent.code);
  const validCountryIndex = randomIntFromInterval(0, validCountries.length - 1);
  const validCountry = validCountries[validCountryIndex];

  const invalidCountries = shuffle<Country>(
    countries.filter((value) => value.continent.code !== continent.code),
  ).splice(0, 3);

  const question = `Which country is in ${continent.name}?`;
  const correctAnswer = validCountry.name;
  const incorrectAnswers = invalidCountries.map((country) => country.name);
  const alternatives = shuffle<string>([correctAnswer, ...incorrectAnswers]);
  return {
    question,
    points: 1,
    correctAnswer,
    incorrectAnswers,
    alternatives,
  };
};
