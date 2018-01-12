import React, { Component } from 'react';
import ReactLogo from './img/logo.svg';
import './App.css';
import WebpackLogo from './img/webpack.svg';
import SSLogo from './img/silverstripe-logo.png';
import GraphQLLogo from './img/GraphQL_Logo.svg.png';
import Header from './components/Header';
import EventList from './pages/EventList';
import { withStyles } from 'material-ui/styles';
import LinkList from './components/LinkList';
import CreateLink from './components/CreateLink';

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
    return (
      <div className="App">
        <header className="App-header">
          <img src={SSLogo} className="ss-logo" alt="SilverStripe logo" />
          <img src={ReactLogo} className="App-logo" alt="React logo" />
          <img src={GraphQLLogo} className="App-logo" alt="graphQL logo" />
          <img src={WebpackLogo} className="App-logo" style={styles.webpackLogo} alt="Webpack logo" />
        </header>

        <Header />
        <div className={classes.cardHolder}>
          <CreateLink />
          <LinkList />
        </div>
      </div>
    )
  }
}

// export default App;
export default withStyles(styles)(App)
