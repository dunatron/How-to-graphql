import React from 'react';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import { ApolloLink, concat, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import { connect } from 'react-redux';
import App from './App';
import {BrowserRouter} from 'react-router-dom';

import GraphQLConfig from './config/GraphQLConfig';
let BASE_URL = BASE_URL_VARIABLE;
let SiteGraphqlConfig = new GraphQLConfig(BASE_URL);
let GRAPHQL_ENDPOINT = SiteGraphqlConfig.getGraphqlEndPoint();

// Create an http link:
const httpLink = new HttpLink({
  // uri: 'http://howtographql.d/graphql/',
  //uri: GRAPHQL_ENDPOINT,
  uri: 'http://hacker-news.whatshapp.nz/graphql/',
  // opts: {
  //   mode: 'no-cors',
  // },
  // headers: {
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  //   'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
  // }
});

// const wsLink = new WebSocketLink({
//   uri: `ws://localhost:4000`,
//   options: {
//     reconnect: true,
//     connectionParams: {
//       authToken: localStorage.getItem(AUTH_TOKEN),
//     }
//   }
// });

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `ws://howtographql.d:5000/`,
  options: {
    reconnect: true
  }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

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
});

const createClient = (token) => new ApolloClient({
  link: concat(createAuthMiddleware(token), link),
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