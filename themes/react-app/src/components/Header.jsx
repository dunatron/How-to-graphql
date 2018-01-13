import React, {Component} from 'react'
import {graphql, gql, compose } from 'react-apollo'
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';
import CreateLink from './CreateLink';
// Material UI
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import { GC_USER_ID, GC_AUTH_TOKEN } from "../constants";

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
    console.log('Trying to logout here');
    console.log(GC_USER_ID)
    console.log(GC_AUTH_TOKEN)
    localStorage.removeItem(GC_USER_ID);
    localStorage.removeItem(GC_AUTH_TOKEN);

    console.log('REMOVE THE TOKEN');

    console.log(GC_USER_ID)
    console.log(GC_AUTH_TOKEN)
    // this.props.history.push(`/new/1`)
    this.props.history.push(`/`)
  };

  render() {
    const userId = localStorage.getItem(GC_USER_ID);
    const authToken = localStorage.getItem(GC_AUTH_TOKEN);
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="contrast" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              Hacker News
            </Typography>
            <Link to='/' className={classes.flex} >New </Link>
            {userId &&
             <Link to='/create' className={classes.flex} >Create </Link>
            }

            <div className='flex flex-fixed'>
              {authToken ?
                <div className='ml1 pointer black' onClick={() => this._logout()}>logout</div>
                :
                <Link to='/login' className='ml1 no-underline black'>login</Link>
              }
            </div>
            <Button color="contrast">Login</Button>
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