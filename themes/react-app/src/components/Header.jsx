import React, {Component} from 'react'
import { graphql, gql, compose } from 'react-apollo'
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

  render() {
    // console.log(this.props);
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
            <Link to='/create' className={classes.flex} >Create </Link>
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