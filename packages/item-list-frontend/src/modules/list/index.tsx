import React from 'react';
import List from '../../components/list/list';
import Prompt from '../../components/prompt/prompt';
import './index.css';
import AddItem from '../../components/add-item/add-item';
import axios from 'axios';
import { IListAttributes, IItem, IAddItemRequest, IUpdateItemRequest } from '@varunsikka/items-list-types';
import { v4 as uuidv4 } from 'uuid';

const BACKEND = 'http://localhost:3001';

interface IListModuleState {
  list?: IListAttributes,
  message: string;
  messageState: string;
};

class ListModule extends React.Component<IListAttributes, IListModuleState> {
  constructor(props: IListAttributes) {
    super(props);
    this.state = {
      list: {
        _id: this.props._id,
        items: []
      },
      message: '',
      messageState: ''
    };

    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.updateItem = this.updateItem.bind(this);

    this.loadComponent();
  }

  async loadComponent() {
    const { data }: { data: IListAttributes } =
      await axios.get(`${BACKEND}/lists/${this.props._id}`);
    
    if (data._id) {
      this.showPrompt('list loaded successfully', 'success');
    } else {
      this.showPrompt('new list created successfully', 'success');
    }
    const serverList = {
      _id: data._id || this.props._id,
      items: data.items || []
    };
    this.setState({ list: serverList });
  }

  showPrompt(message: string, status: string): void {
    this.setState({ message, messageState: status });
    setTimeout(() => this.hidePrompt(), 2000);
  }

  hidePrompt() {
    this.setState({ message: '', messageState: '' });
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
    this.showPrompt('Item add successful', 'success');
  }

  async deleteItem(id: string | undefined | null) {
    const list = this.state.list;
    if (list?.items) {
      list.items = list?.items.filter((item: IItem) => item._id !== id);
    }
    this.setState({ list: list});
    try {
      await axios.delete(`${BACKEND}/lists/${this.props._id}/${id}`);
      this.showPrompt('Item delete success', 'success');
    } catch (err) {
      this.showPrompt('Item delete failed', 'failure');
    }
  }

  async updateItem(id: string | undefined | null, content: string | undefined | null) {
    const list = this.state.list;
    if (list?.items) {
      list.items = list.items.map((item, index) => {
        if (item._id === id) {
          item.content = content || '';
        }
        return item;
      });
    }

    const params: IUpdateItemRequest = {
      content: content || ''
    };

    try {
      await axios.patch(`${BACKEND}/lists/${this.props._id}/${id}`, params);
      this.showPrompt('Item update success', 'success');
    } catch (err) {
      this.showPrompt('Item update failed', 'failure');
    }
  }

  async resetList() {
    const list = this.state.list;
    if (list?.items) {
      list.items = [];
    }
    this.setState({ list: list});
    await axios.delete(`${BACKEND}/lists/${this.props._id}`);
    this.showPrompt('List reset successful', 'success');
  }

  render() {
    const items: IItem[] = this.state.list?.items ? this.state.list?.items : [];
    const _id: string | null = this.state.list?._id ? this.state.list._id : null;
    return <div>
      <div className="list-module">
        <AddItem addItem={this.addItem}></AddItem>
        <List _id={_id} items={items} updateItem={this.updateItem} deleteItem={this.deleteItem}></List>
        <button onClick={this.resetList.bind(this)}>Reset</button>
      </div>
      <Prompt messageState={this.state.messageState} open={this.state.message? true: false}>{this.state.message}</Prompt>
    </div>
  }
}

export default ListModule;
