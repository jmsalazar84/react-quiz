import gql from 'graphql-tag';

export const GET_CONTINENTS_AND_COUNTRIES = gql`
  query GetContinentsAndCountries {
    continents {
      code
      name
    }
    countries {
      code
      name
      continent {
        code
        name
      }
    }
  }
`;

export const GET_COUNTRIES = gql`
  query GetCountries($filter: CountryFilterInput) {
    countries(filter: $filter) {
      code
      name
    }
  }
`;

export const GET_CONTINENTS = gql`
  query GetContinents($filter: ContinentFilterInput) {
    continents(filter: $filter) {
      code
      name
      countries {
        code
        name
      }
    }
  }
`;
