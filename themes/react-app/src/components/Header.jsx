import React, {Component} from 'react'
import { withApollo, graphql, compose } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import gql from 'graphql-tag';
import {Link} from 'react-router-dom';

// Material UI
import Menu, {MenuItem} from 'material-ui/Menu';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Tooltip from 'material-ui/Tooltip';
import AccountCircle from 'material-ui-icons/AccountCircle';
import AddIcon from 'material-ui-icons/Add';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

import { setToken, setUserName } from '../actions/tokenActions';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router";


const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Header extends Component {

  state = {
    auth: true,
    anchorEl: null,
  };

  // ToDo: Not evenly remotely happy about the Login/Logout {VERY FIDDLY}
  _logout = async () => {

    const {client, validateToken, loading, classes} = this.props;

    await localStorage.removeItem('GC_USER_ID');
    await localStorage.removeItem('jwt');

    this.resetStore().then((res) => {
      console.log('reset', res);
    });

    this.props.history.push(`/`)
    // await client.resetStore();

  };

  resetStore = async () => {
    const {client, validateToken, loading, classes} = this.props;
    //await client.resetStore();
  };

  handleChange = (event, checked) => {
    this.setState({auth: checked});
  };

  handleMenu = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleClose = () => {
    this.setState({anchorEl: null});
  };

  render() {

    const {auth, anchorEl} = this.state;
    const open = Boolean(anchorEl);

    const userId = localStorage.getItem('GC_USER_ID');
    const {client, validateToken, loading, classes} = this.props;


    if (loading) {
      return null;
    }

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="contrast" aria-label="Menu">
              <MenuIcon/>
            </IconButton>

            UserID: {userId}

            <Typography type="title" color="inherit" className={classes.flex}>
              Hacker News
            </Typography>

            <Link to='/' >
              <Tooltip id="tooltip-all-links" placement="top" title="Go to Links list">
                <Button fab mini color="primary" aria-label="go to links">
                  Links
                </Button>
              </Tooltip>
            </Link>


            {userId && <Link to='/create' >
              <Tooltip id="tooltip-fab" placement="left"  title="create new link">
                <Button fab mini color="primary" aria-label="Add">
                  <AddIcon/>
                </Button>
              </Tooltip>
            </Link>}

            <div>
              <IconButton
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
              >
                {userId ?
                  <div>
                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                    <MenuItem onClick={() => this._logout()}>Logout</MenuItem>
                  </div>
                  :
                  <div>
                    <MenuItem onClick={this.handleClose}>
                      <Link to='/login' className='ml1 no-underline black'>
                        <Button color="contrast">Login</Button>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                  </div>
                }

              </Menu>
            </div>

          </Toolbar>
        </AppBar>
      </div>
    )
  }

}

const reduxWrapper = connect(
  state => ({
    token: state.token,
  }),
  dispatch => ({
    actions: {
      setToken: bindActionCreators(setToken, dispatch),
      setUserName: bindActionCreators(setUserName, dispatch)
    }
  }));

Header.propTypes = {
  client: PropTypes.instanceOf(ApolloClient),
  classes: PropTypes.object.isRequired,
};

const validateToken = gql`
query validateToken {
    validateToken {
      Valid
      Message
      Code
    }
}`;

export default withRouter(compose(
  withApollo,
  withStyles(styles),
  graphql(validateToken, {
    props: ({ data: { loading, validateToken }, client }) => ({
      loading,
      validateToken,
      resetOnLogout: async () => client.resetStore(),
    }),
  }),
  reduxWrapper
)(Header));
