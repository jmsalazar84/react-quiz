import { ValidContinentFilter } from '@common/filters';
import { QuizQuestion } from '@common/interfaces';
import { randomIntFromInterval } from '@utils/randomIntFromInterval';
import { Continent, Country } from '../../types';
import { WhatContinentIsCountryIn } from './WhatContinentIsCountryIn';
import { WhichCountryIsInContinent } from './WhichCountryIsInContinent';
import { WorldCapitals } from './WorldCapitals';

interface QuizBuilderProps {
  countries: Country[];
  continents: Continent[];
}
export const QuizBuilder = (props: QuizBuilderProps): QuizQuestion => {
  if (props.countries.length === 0 || props.continents.length === 0) {
    return undefined;
  }

  const { countries } = props;
  const quizzes = ['WhatContinentIsCountryIn', 'WhichCountryIsInContinent', 'WorldCapitals'];
  const quizIndex = randomIntFromInterval(0, quizzes.length - 1);
  const selectedQuiz = quizzes[quizIndex];
  const continents = props.continents.filter(ValidContinentFilter);

  let quiz;
  switch (selectedQuiz) {
    case 'WhatContinentIsCountryIn':
      quiz = WhatContinentIsCountryIn(countries, continents);
      break;
    case 'WorldCapitals':
      quiz = WorldCapitals(countries);
      break;
    case 'WhichCountryIsInContinent':
    default:
      quiz = WhichCountryIsInContinent(countries, continents);
  }

  return quiz;
};
