import React, { Component } from 'react';
import './item.css';
import { IItem } from '@varunsikka/items-list-types';

interface IItemProps extends IItem {
  // updateItem()
  deleteItem(id: string | undefined | null): void;
  updateItem(id: string | undefined | null, content: string | undefined | null): void;
  id: number;
  key: string;
}

class Item extends Component<IItemProps> {
  itemTextArea = React.createRef<HTMLTextAreaElement>();
  onClickHandler: React.MouseEventHandler<HTMLSpanElement> = (e) => {
    this.props.deleteItem((e.target as HTMLSpanElement).getAttribute('id'))
  }

  onBlurHandler = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    this.props.updateItem(
      (e.target.parentElement?.getAttribute('data-id')),
      (e.target as HTMLTextAreaElement).value,
    );
  };

  render() {
    const itemValue: string = String(this.props.content);
    return <div id={String(this.props.id)} data-id={this.props._id} className="item">
      <textarea  onBlur={this.onBlurHandler.bind(this)}>{itemValue}</textarea>
      <span id={this.props._id} 
        onClick={this.onClickHandler.bind(this)}
        className="delete"
      ></span>
    </div>;
  }
}

export default Item;
