import React, { Component } from 'react';
import {graphql, gql, compose } from 'react-apollo'
import ReactLogo from './img/logo.svg';
import './App.css';
import WebpackLogo from './img/webpack.svg';
import SSLogo from './img/silverstripe-logo.png';
import GraphQLLogo from './img/GraphQL_Logo.svg.png';
import Header from './components/Header';
import { withStyles } from 'material-ui/styles';
import Login from './components/Login';
import CreateLink from './components/CreateLink';
import LinkList from './components/LinkList';
// import { Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginForm from './components/JWTLoginForm'

const styles = {
  cardHolder: {
    'display': 'flex',
    'align-items': 'center',
    'overflow': 'auto',
    'box-sizing': 'border-box',
    'width': '100%',
    'justify-content': 'center',
    'flex-direction': 'row',
    'flex-wrap': 'wrap',
    'flex-flow': 'row wrap',
    'align-content': 'flex-end'
  },
  webpackLogo: {
    'marginLeft': '30px'
  }
};

class App extends Component {
  render() {

    const { classes } = this.props;

    const { data: { validateToken, loading } } = this.props;
    if (loading) {
      return null;
    }

    console.log('DO we have a token');
    console.log(validateToken)

    console.log('Apps Data')
    console.log(this.props)

    return (
      <div className="App">
        <header className="App-header">
          <img src={SSLogo} className="ss-logo" alt="SilverStripe logo" />
          <img src={ReactLogo} className="App-logo" alt="React logo" />
          <img src={GraphQLLogo} className="App-logo" alt="graphQL logo" />
          <img src={WebpackLogo} className="App-logo" style={styles.webpackLogo} alt="Webpack logo" />
        </header>

        <Header />

          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/create' component={CreateLink} />
            <Route exact path='/' component={LinkList} />
          </Switch>

        {validateToken.Valid && 'You are logged in.'}
        {!validateToken.Valid && <LoginForm />}

      </div>
    )
  }
}

const validateToken = gql`
query validateToken {
    validateToken {
      Valid
      Message
      Code
    }
}`;

// export default withStyles(styles)(App)

export default compose(
  graphql(validateToken),
  withStyles(styles)
)(App);
