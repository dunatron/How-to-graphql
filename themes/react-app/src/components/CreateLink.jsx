import React, {Component} from 'react'
import {graphql, gql, compose } from 'react-apollo'

import {withStyles} from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';

const styles = theme => ({
  createLinkTextFields: {
    'margin': '0 15px'
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

class CreateLink extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      url: ''
    };

  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {

    const { classes } = this.props;

    return (
      <div>
        <div className='flex flex-column mt3'>
          <TextField
            id="CreateLink_title"
            label="title"
            className={classes.createLinkTextFields}
            value={this.state.title}
            onChange={(e) => this.setState({title: e.target.value})}
            type='text'
            placeholder='A description for the link'
            margin="normal"
          />
          <TextField
            id="CreateLink_description"
            label="description"
            className={classes.createLinkTextFields}
            value={this.state.description}
            onChange={(e) => this.setState({description: e.target.value})}
            type='text'
            placeholder='A description for the link'
            margin="normal"
          />
          <TextField
            id="CreateLink_url"
            label="url"
            className={classes.createLinkTextFields}
            value={this.state.url}
            onChange={(e) => this.setState({url: e.target.value})}
            type='text'
            placeholder='The URL for the link'
            margin="normal"
          />
          <Button className={classes.button} raised color="primary" onClick={() => this._createLink()}>
            Send
            <Icon className={classes.rightIcon}>send</Icon>
          </Button>
        </div>
      </div>
    )
  }

  _createLink = async () => {
    console.log('I want to create a new link');
    const { title, description, url } = this.state;
    await this.props.createLinkMutation({
      variables: {
        title,
        description,
        url
      }
    })
    this.props.history.push(`/`)
  }

}

const CREATE_LINK_MUTATION = gql`
  # 2
  mutation CreateLinkMutation($title: String, $description: String, $url: String) {
    createLink(Input: {
      Title: $title
      description: $description,
      url: $url
    }) {
    	ID,
    	Created,
    	Title,
    	url,
    	description
    }
  }
`;


CreateLink.propTypes = {
  classes: PropTypes.object.isRequired,
};

// 3
export default compose(
  graphql(CREATE_LINK_MUTATION, {name: 'createLinkMutation'}),
  withStyles(styles)
)(CreateLink);