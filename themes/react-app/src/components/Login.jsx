import React, {Component} from 'react'
import {graphql, compose} from 'react-apollo'
import gql from 'graphql-tag';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import {withStyles} from "material-ui/styles/index";

const styles = theme => ({
  TextField: {
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

class Login extends Component {

  state = {
    login: true, // switch between Login and SignUp
    FirstName: '',
    Email: '',
    Password: ''
  };

  render() {

    const {classes} = this.props;

    const {data: {validateToken, loading}} = this.props;
    if (loading) {
      return null;
    }

    console.group('Login.jsx PROPS:AFTER');
    console.log(this.props);
    console.groupEnd();

    return (
      <div>

        {validateToken.Valid && 'You are logged in.'}
        {!validateToken.Valid && <div>
          <h4 className='mv3'>{this.state.login ? 'Login' : 'Sign Up'}</h4>
          <div className='flex flex-column'>
            {!this.state.login &&
            <TextField
              label="First Name"
              className={classes.TextField}
              value={this.state.FirstName}
              onChange={(e) => this.setState({FirstName: e.target.value})}
              type='text'
              placeholder='Your name'
              margin="normal"
            />}
            <TextField
              label="Email"
              className={classes.TextField}
              value={this.state.Email}
              onChange={(e) => this.setState({Email: e.target.value})}
              type='text'
              placeholder='Your email address'
              margin="normal"
            />
            <TextField
              label="Password"
              className={classes.TextField}
              value={this.state.Password}
              onChange={(e) => this.setState({Password: e.target.value})}
              type='password'
              placeholder='Choose a safe password'
              margin="normal"
            />
          </div>
          <div className='flex mt3'>
            <Button
              className={classes.button} raised color="primary"
              onClick={() => this._confirm()}>
              {this.state.login ? 'login' : 'create account'}
            </Button>
            <Button
              className={classes.button} raised color="primary"
              onClick={() => this.setState({login: !this.state.login})}>
              {this.state.login ? 'need to create an account?' : 'already have an account?'}
            </Button>
          </div>
        </div>}


      </div>
    )
  }

  _confirm = async () => {
    const {FirstName, Email, Password} = this.state;
    if (this.state.login) {
      // LOGIN

      // 1.
      this.props.loginMutation({
        variables: {
          Email,
          Password,
        },
      })
        .then(response => {

          console.group('CONFIRM LOGIN ');
          console.log(response);
          console.groupEnd();

          //localStorage.setItem('jwt', response.data.createToken.Token);
          const {ID, Token} = response.data.createToken;

          if (typeof Token === 'undefined') {
            console.log('TOKEN IS NOT DEFINED');
            alert('Please Try again')
          } else {
            this._saveUserData(ID, Token);
            this.props.history.push(`/`)
          }
        })
        .catch(err => console.log(err));


      // 2.
      // const result = await this.props.loginMutation({
      //   variables: {
      //     Email,
      //     Password,
      //   },
      // });
      //
      // console.log(result);

      // 3.

      // const {loginMutation} = this.props;
      // loginMutation({
      //   variables: {
      //     Email,
      //     Password,
      //   },
      // })
      //   .then(response => {
      //   localStorage.setItem('jwt', response.data.createToken.Token);
      //   console.log(response)
      // })


    } else {
      // SIGN_UP
      const result = await this.props.signupMutation({
        variables: {
          FirstName,
          Email,
          Password,
        },
      });

      const {ID, token} = result.data.createMember
      this._saveUserData(ID, token);

      // After signing up, it would make sense to validate the token


      this.props.history.push(`/`)
    }

  };

  _saveUserData = (id, token) => {
    localStorage.setItem('USER_ID', id);
    localStorage.setItem('AUTH_TOKEN', token);
    localStorage.setItem('jwt', token);

    // Set GraphCool
    // localStorage.setItem('GC_USER_ID', id);
    // localStorage.setItem('GC_AUTH_TOKEN', id);

    // Dispact

  }

}

const SIGNUP_MUTATION = gql`

  mutation newUser( $FirstName: String, $Email: String!, $Password: String!) {
  createMember(Input: {
    FirstName: $FirstName,
    Email: $Email,
    Password: $Password
  }) {
    ID
    Name
    FirstName
    Email
  }
  
  createToken(Email: $Email, Password: $Password) {
    ID,
    FirstName,
    Token
  }
  
}
`;

const tokenMutation = gql`
mutation createToken($Email: String!, $Password: String!) {
    createToken(Email: $Email, Password: $Password) {
      ID,
      FirstName,
      Token
    },
}`;

const validateToken = gql`
query validateToken {
    validateToken {
      Valid
      Message
      Code
    }
}`;

// export default compose(
//   graphql(SIGNUP_MUTATION, { name: 'signupMutation' }),
//   graphql(LOGIN_MUTATION, { name: 'loginMutation' }),
//   withStyles(styles)
// )(Login)

export default compose(
  graphql(validateToken),
  graphql(validateToken, {name: 'tokenQuery'}),
  graphql(tokenMutation, {name: 'loginMutation'}),
  graphql(SIGNUP_MUTATION, {name: 'signupMutation'}),
  withStyles(styles)
)(Login);