import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloClient, ApolloProvider, createNetworkInterface} from 'react-apollo';
import './index.css';
// import GraphQLConfig from './config/GraphQLConfig';
import registerServiceWorker from './registerServiceWorker';
import store from './state/store';
import { Provider as Redux } from 'react-redux';
import ApolloApp from './ApolloApp';



import axios from 'axios';

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
//
// let myFetch = axios.create({
//   crossDomain : true,
//   "Access-Control-Allow-Origin": "*",
//   baseURL: 'https://emi.azure-api.net',
//   timeout: 1000,
//   headers: {
//     'Access-Control-Allow-Origin': '*',
//     'Ocp-Apim-Subscription-Key': 'bee9281121354f0f97c948d4445e2c6b'}
// });

// myFetch.get('/rtp/?origin=*')
//   .then((response) => {
//     console.log(response)
//   }).catch((err)=> {
//   console.log(err)
// });
// //
// console.log('===above is run before apollo');
//
//
// axios({
//   method:'get',
//   url:'http://bit.ly/2mTM3nY',
//   responseType:'stream'
// })
//   .then(function(response) {
//     response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
//   });


// let instance = axios.create({
//   baseURL: 'http://bit.ly/',
//   timeout: 1000,
//   headers: {'Access-Control-Allow-Origin': '*', 'Content-Type':'application/x-www-form-urlencoded'}
// });
//
// instance.get('2mTM3nY?&origin=*');

// axios({
//   method: 'get',
//   mode: 'no-cors',
//   url: 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=Albert',
//   responseType: 'json',
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/x-www-form-urlencoded',
//     'Authorization': 'test',
//     'X-Test': 'testing'
//   },
//   withCredentials: false,
//   credentials: 'same-origin',
// }).then(function(res) { console.log(res); }) .catch(function(err) { console.log('Error: =>' + err); });

// let instance = axios.create({
//   baseURL: 'https://emi.azure-api.net',
//   // headers: {
//   //   'Content-Type': 'application/x-www-form-urlencoded',
//   //   'Authorization': 'test',
//   //   'X-Test': 'testing',
//   //   'Ocp-Apim-Subscription-Key': 'bee9281121354f0f97c948d4445e2c6b'
//   // },
// });
//
// instance.get('/rtp', {
//   timeout: 5000
// }).then(function(res) { console.log(res); }) .catch(function(err) { console.log('Error: =>' + err); });

// axios('https://emi.azure-api.net/rtp', {
//   method: 'GET',
//   mode: 'no-cors',
//   headers: {
//     'Access-Control-Allow-Origin': '*',
//     'Content-Type': 'application/json',
//     'Ocp-Apim-Subscription-Key': 'bee9281121354f0f97c948d4445e2c6b'
//   },
//   withCredentials: true,
//   credentials: 'same-origin',
// }).then(response => {
//   console.log(response);
// });

// fetch('https://emi.azure-api.net/rtp?Ocp-Apim-Subscription-Key=bee9281121354f0f97c948d4445e2c6b', {
//   mode: 'no-cors',
//   headers: {
//     'Access-Control-Allow-Origin': '*',
//     'Content-Type': 'application/json',
//     'Ocp-Apim-Subscription-Key': 'bee9281121354f0f97c948d4445e2c6b'
//   },
// }) // Call the fetch function passing the url of the API as a parameter
//   .then(function(response) {
//     console.log(response);
//   })
//   .catch(function(err) {
//     // This is where you run code if the server returns any errors
//     console.log(err);
//   });

// let proxyUrl = 'https://cors-anywhere.herokuapp.com/',
//   targetUrl = 'https://emi.azure-api.net/rtp'
// fetch(proxyUrl + targetUrl)
//   .then(blob => blob.json())
//   .then(data => {
//     console.table(data);
//     document.querySelector("pre").innerHTML = JSON.stringify(data, null, 2);
//     return data;
//   })
//   .catch(e => {
//     console.log(e);
//     return e;
//   });


// axios.get('https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=Albert')
//   .then(function(res) { console.log(res); }) .catch(function(err) { console.log('Error: =>' + err); })
//
//
// axios.get('http://bit.ly/2mTM3nY?format=json&origin=*')
//   .then(function(res) { console.log(res); }) .catch(function(err) { console.log('Error: =>' + err); })

// Create an empty Headers instance
// var url = 'https://emi.azure-api.net/rtp';
// let url = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=Albert';
// let url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=Albert';
// // let url = 'https://emi.azure-api.net/rtp?Ocp-Apim-Subscription-Key=bee9281121354f0f97c948d4445e2c6b&origin=*';
//
// fetch(url, {
//   method: 'GET', // or 'PUT'
//   headers: new Headers({
//     'Access-Control-Allow-Origin': '*',
//     'Content-Type': 'application/json',
//     // 'Ocp-Apim-Subscription-Key': 'bee9281121354f0f97c948d4445e2c6b'
//   })
// }).then(res => res.json())
//   .catch(error => console.error('Error:', error))
//   .then(response => console.log('Success:', response));
//
// let url = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=Albert';

const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = "https://emi.azure-api.net/rtp"; // site that doesn’t send Access-Control-*

axios(proxyurl + url, {
  method: 'POST',
  // mode: 'no-cors',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': 'bee9281121354f0f97c948d4445e2c6b'
  },
  // withCredentials: true,
  // credentials: 'same-origin',
}).then(response => {
  console.log(response)
})

//
// const proxyurl = "https://cors-anywhere.herokuapp.com/";
// const url = "https://emi.azure-api.net/rtp"; // site that doesn’t send Access-Control-*
// fetch(proxyurl + url, { headers: new Headers({
//     'Access-Control-Allow-Origin': '*',
//     'Content-Type': 'application/json',
//     'Ocp-Apim-Subscription-Key': 'bee9281121354f0f97c948d4445e2c6b'
//     // 'Ocp-Apim-Subscription-Key': 'bee9281121354f0f97c948d4445e2c6b'
//   })}) // https://cors-anywhere.herokuapp.com/https://example.com
//   .then(response => response.text())
//   .then(contents => console.log(contents))
//   .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))


ReactDOM.render(
  <Redux store={store}>
    <ApolloApp />
  </Redux>,
  document.getElementById('react-root')
);
// registerServiceWorker();

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