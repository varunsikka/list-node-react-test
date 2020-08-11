import React from 'react';
import List from '../../components/list/list';
import Prompt from '../../components/prompt/prompt';
import './index.css';
import AddItem from '../../components/add-item/add-item';
import axios from 'axios';
import { IListAttributes, IItem, IAddItemRequest } from '@varunsikka/items-list-types';
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
  }

  showPrompt(message: string, status: string): void {
    console.log('prompt should be showing')
    this.setState({ message, messageState: status });
    setTimeout(() => this.hidePrompt(), 2000);
  }

  hidePrompt() {
    this.setState({ message: '', messageState: '' });
  }

  async componentWillMount() {
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

  async addItem(content: string) {
    const list = this.state.list;
    const newId = uuidv4();
    console.log(list?.items);
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
    
    await axios.delete(`${BACKEND}/lists/${this.props._id}/${id}`);
    this.showPrompt('Item cannot be deleted', 'failure');
  }

  async resetItem() {
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
        <List _id={_id} items={items} deleteItem={this.deleteItem}></List>
        <button onClick={this.resetItem.bind(this)}>Reset</button>
      </div>
      <Prompt messageState={this.state.messageState} open={this.state.message? true: false}>{this.state.message}</Prompt>
    </div>
  }
}

export default ListModule;
