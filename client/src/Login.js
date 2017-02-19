/**
*
* Login
*
*/

import React from 'react';
// import styled from 'styled-components';


class Login extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <h1>login</h1>
        <form onSubmit={this.props.login}>
          <input type="text" id="authbox" placeholder="username" />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default Login;
