import React, { Component } from 'react';
import './item.css';
import { IItem } from '@varunsikka/items-list-types';

interface IItemProps extends IItem {
  // updateItem()
  deleteItem(id: string | undefined | null): void;
  id: number;
  key: string;
}

class Item extends Component<IItemProps> {
  render() {
    return <div id={String(this.props.id)} className="item">
      <textarea>{this.props.content}</textarea>
      <span id={this.props._id} onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => this.props.deleteItem((e.target as HTMLSpanElement).getAttribute('id'))} className="delete"></span>
    </div>;
  }
}

export default Item;
