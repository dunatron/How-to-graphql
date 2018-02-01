import React, { Component } from 'react';
import { graphql, gql, compose } from 'react-apollo';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { setToken, setUserName } from './actions/tokenActions';
import ReactLogo from './img/logo.svg';
import './App.css';
import WebpackLogo from './img/webpack.svg';
import SSLogo from './img/silverstripe-logo.png';
import GraphQLLogo from './img/GraphQL_Logo.svg.png';
import Header from './components/Header';
import { withStyles } from 'material-ui/styles';
import LoginForm from './containers/JWTLoginForm';
import CreateLink from './components/CreateLink';
import LinkList from './components/LinkList';
// import { Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {withRouter} from "react-router";

import TextField from 'material-ui/TextField';


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

  constructor (props) {
    super(props)

    this.state = {
      UserName: "default user",
    };
  }

  onClick = (e) => {
    e.preventDefault()
    // dispatch a Redux action
    this.props.actions.setUserName(this.state.UserName);
  };

  render() {

    const { data: { validateToken, loading }, classes } = this.props;

    if (loading) {
      return null;
    }

    console.group('App.jsx PROPS');
    console.log(this.props);
    console.groupEnd();

    return (
      <div className="App">
        {validateToken.Valid && 'You are logged in.'}
        {!validateToken.Valid && 'Not Logged in'}
        <div>
          <TextField
            label="User Name"
            value={this.state.UserName}
            onChange={(e) => this.setState({UserName: e.target.value})}
            type='text'
            placeholder='Your name'
            margin="normal"
          />}
          <h1>token.yourData: {this.props.token.yourData}</h1>
          <h1>token.userName: {this.props.token.userName}</h1>
          <button onClick={this.onClick}>Test Redux</button>
        </div>
        <header className="App-header">
          <img src={SSLogo} className="ss-logo" alt="SilverStripe logo" />
          <img src={ReactLogo} className="App-logo" alt="React logo" />
          <img src={GraphQLLogo} className="App-logo" alt="graphQL logo" />
          <img src={WebpackLogo} className="App-logo" style={styles.webpackLogo} alt="Webpack logo" />
        </header>

        <Header />

          <Switch>
            <Route exact path='/' component={LinkList} />
            <Route exact path='/login' component={LoginForm} />
            <Route exact path='/create' component={CreateLink} />
          </Switch>

      </div>
    )
  }
}

// You may need to pay attention here
const reduxWrapper = connect(
  // I think this is what you are looking for
  // state => ({
  //   yourData: state.yourData
  // }),
  state => ({
    token: state.token
  }),
  // You can also map dispatch to props
  dispatch => ({
    actions: {
      setToken: bindActionCreators(setToken, dispatch),
      setUserName: bindActionCreators(setUserName, dispatch)
    }
  }));

const validateToken = gql`
query validateToken {
    validateToken {
      Valid
      Message
      Code
    }
}`;

export default withRouter(compose(
  reduxWrapper,
  graphql(validateToken),
  connect(),
  withStyles(styles)
)(App));

// const gqlWrapper = graphql(query, {
//   options: (ownProps) => ({
//     variables: {
//       id: ownProps.id,
//     }
//   }),
// })
//
// // `compose` makes wrapping component much easier and cleaner
// export default compose(
//   reduxWrapper,
//   gqlWrapper,
// )(reactClass)

// `compose` makes wrapping component much easier and cleaner
// export default compose(
//   reduxWrapper,
//   graphql(validateToken),
//   connect(),
//   withStyles(styles)
// )(App)

// export default compose(
//   reduxWrapper,
//   graphql(validateToken),
//   withStyles(styles)
// )(App)

// export default compose(
//   graphql(validateToken),
//   reduxWrapper,
//   withStyles(styles)
// )(App)

// export default withRouter(compose(
//   graphql(validateToken),
//   reduxWrapper,
//   withStyles(styles)
// )(App));

// export default withStyles(styles)(App)
//
// export default compose(
//   graphql(validateToken),
//   withStyles(styles)
// )(App);


// export default compose(
//   graphql(validateToken),
//   connect(),
//   withStyles(styles)
// )(App);