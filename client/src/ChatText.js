/**
*
* ChatText
*
*/

import React from 'react';
// import styled from 'styled-components';


class ChatText extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="chat" key={this.props.keys}>
        <span className="name">${this.props.name}</span>:
        <span className="txt"> {this.props.txt}</span>
        <span className="stamp"> {this.props.stamp}</span>
      </div>
    );
  }
}

export default ChatText;
