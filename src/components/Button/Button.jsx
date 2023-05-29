import React, { Component } from 'react';

class Button extends Component {
  render() {
    const { onButtonClick, isHidden } = this.props;

    return (
      <button className='Button' type="button" onClick={onButtonClick} hidden={isHidden}>
        Load more
      </button>
    );
  }
}

export default Button;