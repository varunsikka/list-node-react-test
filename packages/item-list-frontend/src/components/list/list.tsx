import React from 'react';
import Item from '../item/item';
import './list.css';
import { IListAttributes } from '@varunsikka/items-list-types';

interface IListProps extends IListAttributes {
  deleteItem(id: string | undefined | null): void;
  updateItem(id: string | undefined | null, content: string | undefined | null): void;
}

class List extends React.Component<IListProps> {
  listBox = React.createRef<HTMLDivElement>();

  componentDidUpdate() {
    if (this.listBox.current) {
      this.listBox.current.scrollTop = this.listBox.current?.scrollHeight;
    }
  }

  render() {
    const items = this.props.items?.map((item: any, index: number) => <Item key={item._id} id={index} _id={item._id} updateItem={this.props.updateItem} deleteItem={this.props.deleteItem} content={item.content}></Item>);
    return (
      <div ref={this.listBox} className="list-content list">{items}</div>
    );
  }
}

export default List;
