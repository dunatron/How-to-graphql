import React, {Component} from 'react'
import {graphql, gql, compose} from 'react-apollo'
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router'
import JWTLoginForm from './JWTLoginForm';
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
import {GC_USER_ID, GC_AUTH_TOKEN} from "../constants";
import store from '../state/store';

import { setToken, setUserName } from '../actions/tokenActions';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";


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


// store.subscribe(() => {
//   console.group('STore Subscription from Header.jsx');
//   console.log(store.getState());
//   console.groupEnd();
// });
//
//
// store.dispatch({
//   type: 'ADD_QUOTE',
//   text: 'If debugging is the process of removing software bugs, then programming must be the process of putting them in.',
//   person: 'Edsger Dijkstra'
// });

class Header extends Component {

  state = {
    auth: true,
    anchorEl: null,
  };


  _logout = async () => {

    await localStorage.removeItem('USER_ID')
    await localStorage.removeItem('AUTH_TOKEN')
    await localStorage.removeItem('jwt');
    await this.props.actions.setToken(null);
    // ToDO : this for whatever reason is not working


    console.group('LOGOUT HEADER PROPS');
    console.log(this.props);
    console.groupEnd();

    // const { validateToken } = this.props;
    // validateToken()
    //   .then(response => {
    //     console.log(response);
    //   });

    // this.forceUpdate();
    // this.props.history.push(`/`)

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
    //const userId = localStorage.getItem(GC_USER_ID)
    const userId = localStorage.getItem('USER_ID');
    // const {token: {token}} = store.getState();
    const {classes} = this.props;
    const {auth, anchorEl} = this.state;
    const open = Boolean(anchorEl);



    // const testToken = this.props.token.token;
    // const testToken = this.props.token;
    // const testToken = this.props;
    const {token: {token}} = this.props;

    console.group('TEST Token');
    console.log(token);
    console.groupEnd();

    // console.group('Header.jsx');
    // console.log(this.props);
    // console.log(token);
    // console.groupEnd();


    const {data: {validateToken, loading}} = this.props;
    if (loading) {
      return null;
    }

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="contrast" aria-label="Menu">
              <MenuIcon/>
            </IconButton>

            {/*<div>{userId ? <h1>Yes user:{userId}</h1> : <h2>No User:{userId}</h2>} </div>*/}
            {/*<div>{token ? <p>Token:{token.token}</p> : <p>Token: {token.token}</p>} </div>*/}

            <Typography type="title" color="inherit" className={classes.flex}>
              Hacker News
            </Typography>

            <Link to='/' className={classes.flex}>Links </Link>

            <Link to='/' className={classes.flex}>
              <Tooltip id="tooltip-all-links" placement="top" className={classes.fab} title="Go to Links list">
                <Button fab mini color="primary" aria-label="go to links">
                  Links
                </Button>
              </Tooltip>
            </Link>


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
                {token ?
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


            <div className='flex flex-fixed'>
              {token ?
                <div>
                  <Button><Link to='/create' className={classes.flex}>Create </Link></Button>
                  <Link to='/create' className={classes.flex}>
                    <Tooltip id="tooltip-fab" placement="left" className={classes.fab} title="create new link">
                      <Button fab mini color="primary" aria-label="Add">
                        <AddIcon/>
                      </Button>
                    </Tooltip>
                  </Link>
                  <Button color="contrast" onClick={() => this._logout()}>Logout</Button>
                </div>
                :
                <Link to='/login' className='ml1 no-underline black'>
                  <Button color="contrast">Login</Button>
                </Link>
              }
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  }

}

const reduxWrapper = connect(
  // I think this is what you are looking for
  // state => ({
  //   yourData: state.yourData
  // }),
  state => ({
    token: state.token,
  }),
  // You can also map dispatch to props
  dispatch => ({
    actions: {
      setToken: bindActionCreators(setToken, dispatch),
      setUserName: bindActionCreators(setUserName, dispatch)
    }
  }));

// Header.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

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
  withStyles(styles)
)(Header));

//export default withRouter(connect(mapStateToProps)(Something))

// export default withRouter(Header)