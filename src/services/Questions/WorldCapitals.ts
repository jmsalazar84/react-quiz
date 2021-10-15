import { QuizQuestion } from '@common/interfaces';
import { randomIntFromInterval } from '@utils/randomIntFromInterval';
import { shuffle } from '@utils/shuffle';
import { Continent, Country } from '../../types';

export const WorldCapitals = (countries: Country[]): QuizQuestion | undefined => {
  if (countries.length < 4) {
    return undefined;
  }

  const countryIndex = randomIntFromInterval(0, countries.length - 1);
  const country = countries[countryIndex];

  const invalidCountries = shuffle<Country>(countries.filter((value) => value.code !== country.code)).splice(0, 3);

  const question = `What is the capital of ${country.name}?`;
  const correctAnswer = country.capital;
  const incorrectAnswers = invalidCountries.map((country) => country.capital);
  const alternatives = shuffle<string>([correctAnswer, ...incorrectAnswers]);

  return {
    question,
    points: 1,
    correctAnswer,
    incorrectAnswers,
    alternatives,
  };
};
