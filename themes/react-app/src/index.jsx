import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloClient, ApolloProvider, createNetworkInterface} from 'react-apollo';
import './index.css';
// import GraphQLConfig from './config/GraphQLConfig';
import registerServiceWorker from './registerServiceWorker';
import store from './state/store';
import { Provider as Redux } from 'react-redux';
import ApolloApp from './ApolloApp';

ReactDOM.render(
  <Redux store={store}>
    <ApolloApp />
  </Redux>,
  document.getElementById('react-root')
);
registerServiceWorker();

/**
 * Get GraphQL endpoint
 */

/*

let BASE_URL = BASE_URL_VARIABLE;
let SiteGraphqlConfig = new GraphQLConfig(BASE_URL);
let GRAPHQL_ENDPOINT = SiteGraphqlConfig.getGraphqlEndPoint();

*/

/**
 * ToDo: When we build our project we need to hit and query our graphQL endpoint.
 * We need this for fragment and union matching as it needs to know our schema.
 * So this little function will need to somehow hit our endpoint and create A JSON File for our bundle to use
 */

/**
 * configure network interface for apollo client
 * ToDo: get fragment and union matching to work
 */

/*
const networkInterface = createNetworkInterface({
  //uri: 'http://my-app.local/graphql'
  uri: GRAPHQL_ENDPOINT
});
*/

/*
networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }
    const token = localStorage.getItem(AUTH_TOKEN)
    req.options.headers.authorization = token ? `Bearer ${token}` : null
    next()
  }
}]);
*/
/**
 * configure apollo client to use for ApolloProvider component
 * @type {ApolloClient | ApolloClient<any>}
 */
/*
const client = new ApolloClient({
  networkInterface: networkInterface
});
*/



/**
 * Render our app at given element
 * currently found in ReactPage.ss
 */
/*
ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App/>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('react-root')
);
*/