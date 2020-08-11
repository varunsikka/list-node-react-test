import React from 'react';
import List from '../../components/list/list';
import './index.css';
import AddItem from '../../components/add-item/add-item';
import axios from 'axios';
import { IListAttributes, IItem, IAddItemRequest } from '@varunsikka/items-list-types';
import { v4 as uuidv4 } from 'uuid';

const BACKEND = 'http://localhost:3001';

interface IListModuleState {
  list?: IListAttributes
};

class ListModule extends React.Component<IListAttributes, IListModuleState> {
  constructor(props: IListAttributes) {
    super(props);
    this.state = {
      list: {
        _id: this.props._id,
        items: []
      }
    }
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  async componentWillMount() {
    const { data }: { data: IListAttributes } =
      await axios.get(`${BACKEND}/lists/${this.props._id}`);
    console.log(data);
    const serverList = {
      _id: data._id,
      items: data.items
    };
    this.setState({ list: serverList });
  }

  async addItem(content: string) {
    const list = this.state.list;
    const newId = uuidv4();
    if (list?.items) {
      list?.items.push({
        _id: newId,
        content
      });
    }
    this.setState({ list: list });
    const newItem: IAddItemRequest = {
      _id: newId,
      content: content
    };
    await axios.post(`${BACKEND}/lists/${this.props._id}`, newItem);
  }

  async deleteItem(id: string | undefined | null) {
    const list = this.state.list;
    if (list?.items) {
      list.items = list?.items.filter((item: IItem) => item._id !== id);
    }
    this.setState({ list: list});

    await axios.delete(`${BACKEND}/lists/${this.props._id}/${id}`);
  }

  render() {
    const items: IItem[] = this.state.list?.items ? this.state.list?.items : [];
    const _id: string | null = this.state.list?._id ? this.state.list._id : null;
    return <div className="list-module">
        <AddItem addItem={this.addItem}></AddItem>
        <List _id={_id} items={items} deleteItem={this.deleteItem}></List>
      </div>
  }
}

export default ListModule;
