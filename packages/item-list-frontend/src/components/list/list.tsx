import React from 'react';
import Item from '../item/item';
import './list.css';
import { IListAttributes } from '@varunsikka/items-list-types';

interface IListProps extends IListAttributes {
  deleteItem(id: string | undefined | null): void;
}

class List extends React.Component<IListProps> {
  listBox = React.createRef<HTMLDivElement>();

  componentDidUpdate() {
    if (this.listBox.current) {
      this.listBox.current.scrollTop = this.listBox.current?.scrollHeight;
    }
  }

  render() {
    const items = this.props.items?.map((item: any, index: number) => <Item key={item._id} id={index} _id={item._id} deleteItem={this.props.deleteItem} content={item.content}></Item>);
    console.log(this.props.items);
    return (
      <div ref={this.listBox} className="list-content list">{items}</div>
    );
  }
}

export default List;
