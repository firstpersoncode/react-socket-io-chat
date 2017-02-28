/**
*
* ChatBox
*
*/

import React from 'react';
// import styled from 'styled-components';


class ChatBox extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div id="chat-box">
        <form onSubmit={this.props.newChat}>
          <input type="text" id="chatbox" />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default ChatBox;
