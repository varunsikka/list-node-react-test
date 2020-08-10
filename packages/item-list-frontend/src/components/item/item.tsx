import React, { Component } from 'react';
import './item.css';


class Item extends Component<any> {
  render() {
    return <div id={this.props.id} className="item">
      <textarea>{this.props.children}</textarea>
      <span className="delete"></span>
    </div>;
  }
}

export default Item;
