import React from 'react';
import './add-item.css';

interface IAddItem {
  textInput?: React.RefObject<HTMLInputElement | undefined>;
  addItem(content: string | undefined): void;
}

class AddItem extends React.Component<IAddItem> {
  textInput = React.createRef<HTMLInputElement>();

  handleAddItem(e: any) {
    e.preventDefault();
    const content = this.textInput.current;
    this.props.addItem(content?.value);
    if (this.textInput.current) {
      this.textInput.current.value = '';
    }
  }

  render() {
    return <div className="list-content add-item">
        <input type="text" placeholder="Enter item..." ref={this.textInput} name="item-content" />
        <button onClick={this.handleAddItem.bind(this)}>Add</button>
      </div>
  }
}

export default AddItem;
