import React, { Component } from 'react'
import { graphql, gql, compose } from 'react-apollo'
import { GC_AUTH_TOKEN } from '../constants'

class Login extends Component {

  state = {
    login: true, // switch between Login and SignUp
    FirstName: '',
    Email: '',
    Password: ''
  };

  render() {

    return (
      <div>
        <h4 className='mv3'>{this.state.login ? 'Login' : 'Sign Up'}</h4>
        <div className='flex flex-column'>
          {!this.state.login &&
          <input
            value={this.state.FirstName}
            onChange={(e) => this.setState({ FirstName: e.target.value })}
            type='text'
            placeholder='Your name'
          />}
          <input
            value={this.state.Email}
            onChange={(e) => this.setState({ Email: e.target.value })}
            type='text'
            placeholder='Your email address'
          />
          <input
            value={this.state.Password}
            onChange={(e) => this.setState({ Password: e.target.value })}
            type='password'
            placeholder='Choose a safe password'
          />
        </div>
        <div className='flex mt3'>
          <div
            className='pointer mr2 button'
            onClick={() => this._confirm()}
          >
            {this.state.login ? 'login' : 'create account' }
          </div>
          <div
            className='pointer button'
            onClick={() => this.setState({ login: !this.state.login })}
          >
            {this.state.login ? 'need to create an account?' : 'already have an account?'}
          </div>
        </div>
      </div>
    )
  }

  _confirm = async () => {
    const { FirstName, Email, Password } = this.state;
    if (this.state.login) {
      const result = await this.props.loginMutation({
        variables: {
          Email,
          Password,
        },
      });
      const { user, token } = result.data.login;
      this._saveUserData(user.id, token)
    } else {
      const result = await this.props.signupMutation({
        variables: {
          FirstName,
          Email,
          Password,
        },
      });
      console.log('hmmmm sign me up plaese');
      console.log(result.data.createMember);
      const { Member, token } = result.data.createMember;
      console.log('Member data');
      console.log(Member);
      this._saveUserData(result.data.createMember.ID, token)
    }
    this.props.history.push(`/`)
  };

  _saveUserData = (token) => {
    localStorage.setItem(GC_AUTH_TOKEN, token)
  }

}

// const SIGNUP_MUTATION = gql`
//   mutation SignupMutation($email: String!, $password: String!, $name: String!) {
//     signup(email: $email, password: $password, name: $name) {
//       user {
//         id
//       }
//       token
//     }
//   }
// `;

const SIGNUP_MUTATION = gql`
  mutation newUser( $FirstName: String, $Email: String) {
  createMember(Input: {
    FirstName: $FirstName,
    Email: $Email,
  }) {
    ID
    Name
    FirstName
    Email
  }
}
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
      }
      token
    }
  }
`;

export default compose(
  graphql(SIGNUP_MUTATION, { name: 'signupMutation' }),
  graphql(LOGIN_MUTATION, { name: 'loginMutation' }),
)(Login)