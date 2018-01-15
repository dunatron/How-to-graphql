import React from 'react';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink, concat } from 'apollo-link';
import { connect } from 'react-redux';
import App from './App';
import {BrowserRouter} from 'react-router-dom'

const httpLink = new HttpLink({ uri: 'http://howtographql.d/graphql' });
const createAuthMiddleware = (token) => new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  if (token) {
    operation.setContext({
      headers: {
        Authorization: 'Bearer ' + token,
      }
    });
    console.log(token)
  }
  return forward(operation);
})

const createClient = (token) => new ApolloClient({
  link: concat(createAuthMiddleware(token), httpLink),
  cache: new InMemoryCache({
    dataIdFromObject: (o) => {
      if (o.ID >= 0 && o.__typename) {
        return `${o.__typename}:${o.ID}`;
      }
      return null;
    },
  }),
});
const client = createClient(localStorage.getItem('jwt'));
const ApolloApp = ({ token }) => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
);

export default connect(
  (state) => ({
    token: state.token
  })
)(ApolloApp);