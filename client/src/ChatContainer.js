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
    this.state = {
      loading: false,
    };
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
      this.setState({ loading: true });
      this.props.loadHistory();
      setTimeout(() => {
        this.setState({ loading: false });
      }, 2000)
    }
  }

  render() {
    return (
      <div id="chat-container" class={this.state.loading ? "loading" : ""}>
        <div class="loading-effect"> load previous chat .. </div>
        { this.props.mapChat }
        <hr />
      </div>
    );
  }
}

export default ChatContainer;
