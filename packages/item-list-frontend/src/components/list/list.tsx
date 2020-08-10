import React from 'react';
import Item from '../item/item';
import './list.css';
import { IListAttributes } from '@varunsikka/items-list-types';

class List extends React.Component<IListAttributes> {
  listBox = React.createRef<HTMLDivElement>();

  componentDidUpdate() {
    if (this.listBox.current) {
      this.listBox.current.scrollTop = this.listBox.current?.scrollHeight;
    }
  }

  render() {
    const items = this.props.items?.map((item: any, index: number) => <Item id={index}>{item.content}</Item>);
    return (
      <div ref={this.listBox} className="list-content list">{items}</div>
    );
  }
}

export default List;
