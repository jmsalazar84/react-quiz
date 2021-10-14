import { Continent, Country } from 'src/types';
import { shuffle, randomIntFromInterval } from '../../../utils';

export interface QuizQuestion {
  question: string;
  points: number;
  correctAnswer: string;
  incorrectAnswers: string[];
  alternatives: string[];
}


export const genCountryInContinent = (countries: Country[], continents: Continent[]): QuizQuestion | undefined => {
  if (countries.length === 0 || continents.length === 0) {
    return undefined;
  }
  const continentIndex = randomIntFromInterval(0, continents.length -1);
  const continent = continents[continentIndex];
  

  const validCountries = countries.filter((country) => country.continent.code === continent.code);
  const validCountryIndex = randomIntFromInterval(0, validCountries.length -1 );
  const validCountry = validCountries[validCountryIndex];

  const invalidCountries = shuffle<Country>(
    countries.filter((country) => country.continent.code !== continent.code),
  ).splice(0, 3);

  const question = `Which country is in ${continent.name}?`;
  const correctAnswer = validCountry.name;
  const incorrectAnswers = invalidCountries.map((country) => country.name);
  const alternatives = shuffle<string>([correctAnswer,... incorrectAnswers]);
  return {
    question,
    points: 1,
    correctAnswer,
    incorrectAnswers,
    alternatives,
  };
};


export const genQuiz = (countries: Country[], continents: Continent[]): QuizQuestion | undefined => {
  return genCountryInContinent(countries, continents);
};