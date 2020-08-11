import React, { Component } from 'react';
import './item.css';
import { IItem } from '@varunsikka/items-list-types';

interface IItemProps extends IItem {
  // updateItem()
  deleteItem(id: string | undefined | null): void;
  updateItem(id: string | undefined | null, content: string | undefined | null): void;
  id: number;
  key: string;
  status: boolean;
}

enum IItemStatus {
  Active,
  Pending
}

interface IItemState {
  listId: string;
  _id: string;
  content: string;
  status: IItemStatus;
}

class Item extends Component<IItemProps, IItemState> {
  constructor(props: IItemProps) {
    super(props);

    this.state = {
      listId: String(this.props.id),
      _id: this.props._id,
      content: String(this.props.content),
      status: IItemStatus.Active
    };
  }

  itemTextArea = React.createRef<HTMLTextAreaElement>();
  onClickHandler: React.MouseEventHandler<HTMLSpanElement> = (e) => {
    this.setState({ status: IItemStatus.Pending});
    this.props.deleteItem((e.target as HTMLSpanElement).getAttribute('id'))
  }

  onBlurHandler = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    this.setState({ status: IItemStatus.Pending, content: (e.target as HTMLTextAreaElement).value});
    this.props.updateItem(
      (e.target.parentElement?.getAttribute('data-id')),
      (e.target as HTMLTextAreaElement).value,
    );
  };

  render() {
    return <div id={String(this.state.listId)} data-id={this.state._id} className="item">
      <textarea  onBlur={this.onBlurHandler.bind(this)}>{this.state.content}</textarea>
      <span id={this.props._id} 
        onClick={this.onClickHandler.bind(this)}
        className="delete"
      ></span>
      <span className={this.state.status === IItemStatus.Pending ? 'pending show' : 'pending hide'}></span>
      {this.props._id} - {this.props.status.toString()}
    </div>;
  }
}

export default Item;
