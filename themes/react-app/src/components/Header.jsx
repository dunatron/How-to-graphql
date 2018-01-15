import React, {Component} from 'react'
import {graphql, gql, compose} from 'react-apollo'
import {Link} from 'react-router-dom';
import JWTLoginForm from './JWTLoginForm';
// Material UI
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Tooltip from 'material-ui/Tooltip';
import AddIcon from 'material-ui-icons/Add';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import {GC_USER_ID, GC_AUTH_TOKEN} from "../constants";

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


  _logout = async () => {

    localStorage.removeItem('USER_ID')
    localStorage.removeItem('AUTH_TOKEN')
    // ToDO : this for whatever reason is not working
    this.props.history.push(`/`)
  };

  render() {
    const userId = localStorage.getItem('USER_ID');
    const authToken = localStorage.getItem('AUTH_TOKEN');
    const {classes} = this.props;

    console.log(authToken);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="contrast" aria-label="Menu">
              <MenuIcon/>
            </IconButton>

            <Typography type="title" color="inherit" className={classes.flex}>
              Hacker News
            </Typography>
            <Link to='/' className={classes.flex}>New </Link>
            {/*ToDO: this works becasue userId has a value of 0...*/}
            {/*{userId &&*/}
            {/*<Link to='/create' className={classes.flex} >Create </Link>*/}
            {/*}*/}

            <div className='flex flex-fixed'>
              {authToken ?
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

// Header.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default compose(
  withStyles(styles)
)(Header);