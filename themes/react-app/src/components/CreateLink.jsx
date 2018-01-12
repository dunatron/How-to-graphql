import React, {Component} from 'react'
import {graphql, gql, compose } from 'react-apollo'

import {withStyles} from 'material-ui/styles';
import TextField from 'material-ui/TextField';

const styles = {
  cardHolder: {
    'display': 'flex',
  }
};

class CreateLink extends Component {

  constructor(props) {
    super(props);
    this.state = {
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
        <TextField
          id="name"
          label="Name"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
        />
        <div className='flex flex-column mt3'>
          <TextField
            id="CreateLink_description"
            label="description"
            className={classes.textField}
            value={this.state.description}
            onChange={(e) => this.setState({description: e.target.value})}
            type='text'
            placeholder='A description for the link'
            margin="normal"
          />
          <TextField
            id="CreateLink_url"
            label="url"
            className={classes.textField}
            value={this.state.url}
            onChange={(e) => this.setState({url: e.target.value})}
            type='text'
            placeholder='The URL for the link'
            margin="normal"
          />
        </div>
        <button
          onClick={() => this._createLink()}
        >
          Submit
        </button>
      </div>
    )
  }

  _createLink = async () => {
    console.log('I want to create a new link');
    const {description, url} = this.state;
    await this.props.createLinkMutation({
      variables: {
        description,
        url
      }
    })
  }

}

const CREATE_LINK_MUTATION = gql`
  # 2
  mutation CreateLinkMutation($description: String, $url: String) {
    createLink(Input: {
      description: $description,
      url: $url
    }) {
    	ID,
    	Created,
    	url,
    	description
    }
  }
`;


// 3
// export default graphql(CREATE_LINK_MUTATION, {name: 'createLinkMutation'})(CreateLink)


export default compose(
  graphql(CREATE_LINK_MUTATION, {name: 'createLinkMutation'}),
  withStyles(styles)
)(CreateLink);