import { Continent } from '../../types';

export const ValidContinentFilter = (value: Continent) => {
  return value.code !== 'AN';
};
