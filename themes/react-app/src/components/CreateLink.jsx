import React, {Component} from 'react'
import {graphql, gql, compose} from 'react-apollo'

import {withStyles} from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import {ALL_LINKS_QUERY} from './LinkList'

import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { dark } from 'react-syntax-highlighter/styles/prism';

const styles = theme => ({
  createNewsForm: {
    'padding': '20px',
    'margin': '20px'
  },
  createLinkTextFields: {
    'margin': '0 15px'
  },
  button: {
    margin: theme.spacing.unit,
    'display': 'block',
    'margin-left': 'auto',
    'margin-right': 'auto'
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
      url: '',
      codeString: '(num) => num + 1'
    };

  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {

    const {classes} = this.props;

    return (
      <form className={classes.createNewsForm} noValidate autoComplete="off">

        <SyntaxHighlighter language='javascript' style={dark}>{this.state.codeString}</SyntaxHighlighter>

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
      </form>
    )
  }

  _createLink = async () => {
    const createdById = localStorage.getItem('GC_USER_ID');

    if (!createdById) {
      alert('You shall not create without signing in...');
      this.props.history.push(`/login`);
      return;
    }

    const {title, description, url} = this.state;

    await this.props.createLinkMutation({
      variables: {
        title,
        description,
        url,
        createdById
      },
      update: (store, {data: {createLink}}) => {
        const data = store.readQuery({query: ALL_LINKS_QUERY})
        console.log(data);
        data.readLinks.edges.splice(0,0,createLink)
        store.writeQuery({
          query: ALL_LINKS_QUERY,
          data
        })
      }
    });

    this.props.history.push(`/`)
  }

}

const CREATE_LINK_MUTATION = gql`
  # 2
  mutation CreateLinkMutation($title: String, $description: String, $url: String, $createdById: ID) {
    createLink(Input: {
      Title: $title
      description: $description,
      url: $url,
      OwnerID: $createdById
    }) {
    	ID,
    	Created,
    	Title,
    	url,
    	description
    	OwnerID
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