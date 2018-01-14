import React, {Component} from 'react';
import {gql} from 'react-apollo';
import {propType as fragmentPropType} from 'graphql-anywhere';
import {withStyles} from 'material-ui/styles';
import Card, {CardActions, CardContent, CardMedia} from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';


class Link extends Component {
  render() {
    // console.log(this.props);
    return (
      <div>
        <div>{this.props.link.Title}</div>
        <div>{this.props.link.description} ({this.props.link.url})</div>
      </div>
    )
  }

  _voteForLink = async () => {
    // you will implement this in chapter 6
  }

}

export default Link

