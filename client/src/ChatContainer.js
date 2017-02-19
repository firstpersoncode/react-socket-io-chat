/**
*
* ChatContainer
*
*/

import React from 'react';
// import styled from 'styled-components';


class ChatContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
  }

  componentDidMount() {
    document.getElementById('chat-container').addEventListener('scroll', this.handleScroll.bind(this));
  }

  componentWillUnmount() {
    document.getElementById('chat-container').removeEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll() {
    var elem = document.getElementById('chat-container');
    this.setState({
      scroll: elem.scrollTop
    })

    // load history chat when scroll to top
    if (this.state.scroll === 0) {
      setTimeout(() => {
        this.props.loadHistory()
      }, 300)
    }
  }

  render() {
    const style = {
      'height':'300px',
      'overflowY':'scroll',
      'padding':'10px',
    }

    return (
      <div style={style} id="chat-container">
        { this.props.mapChat }
        <hr />
      </div>
    );
  }
}

export default ChatContainer;
