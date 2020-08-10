import React from 'react';
import List from '../../components/list/list';
import './index.css';
import AddItem from '../../components/add-item/add-item';
import axios from 'axios';
import { IListAttributes, IAddItemRequest } from '@varunsikka/items-list-types';

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
  }

  async componentWillMount() {
    const { data } = await axios.get(`${BACKEND}/lists/${this.props._id}`);
    console.log(data);
    const serverList = {
      _id: data._id,
      items: data.items
    };
    this.setState({ list: serverList });
  }

  async addItem(content: string) {
    const list = this.state.list;
    if (list?.items) {
      list?.items.push({
        content
      });
    }
    this.setState({ list: list });
    const newItem: IAddItemRequest = {
      item: content
    };
    await axios.post(`${BACKEND}/lists/${this.props._id}`, newItem);
  }

  render() {
    return <div className="list-module">
        <AddItem addItem={this.addItem}></AddItem>
        <List _id={this.state.list ? this.state.list._id: null} items={this.state.list ? this.state.list.items: []}></List>
      </div>
  }
}

export default ListModule;
