import * as React from 'react';
import { render } from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './components/App/index';
import { config } from './configs/index';
import './index.scss';

const client = new ApolloClient({
  uri: config.api.url,
  cache: new InMemoryCache(),
});

const rootElement = document.getElementById('root');

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  rootElement,
);
