import React from 'react';
import './prompt.css';

class Prompt extends React.Component<{open: boolean, messageState: string}> {
  render() {
    const css: string=`prompt ${this.props.messageState} ${this.props.open ? 'open' : 'hide'}`;
    return <div className={css}>{this.props.children}</div>;
  }
}

export default Prompt;
