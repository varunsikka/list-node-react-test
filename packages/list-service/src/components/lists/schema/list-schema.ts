import { IListAttributes, IItem, IAddItem } from '@varunsikka/items-list-types';
import { ItemSchema } from './item-schema';
import { DataStore } from 'src/adapters/datastore';

// ListSchema._databaseConnection = new DataStore<IList>();

/**
 *
 *
 * @export
 * @class ListSchema
 */
export class ListSchema implements IListAttributes {
  static _databaseConnection: DataStore<IListAttributes>;

  /**
   *
   *
   * @type {string}
   * @memberof ListSchema
   */
  _id: string;

  /**
   *
   *
   * @private
   * @type {Item[]}
   * @memberof ListSchema
   * Stores the list item
   */
  items: IItem[];

  constructor(list: IListAttributes) {
    this._id = list._id;
    this.items = list.items;
  }

  /**
   * Instance methods
   */
  public add(attributes: IAddItem): void {
    const { item } = attributes;
    const itemSchema = new ItemSchema();
    itemSchema.item = item;
    this.items.push(itemSchema);

    ListSchema._databaseConnection.update({
      _id: this._id,
      items: this.items,
    });
  }

  public remove(index: number): void {
    this.items.splice(index, 1);
    ListSchema._databaseConnection.update({
      _id: this._id,
      items: this.items,
    });
  }

  public reset(): void {
    this.items = [];
    ListSchema._databaseConnection.update({
      _id: this._id,
      items: this.items,
    });
  }

  /*
   * Static methods
   */
  static find(_id: string): ListSchema {
    const list = ListSchema._databaseConnection.findById(_id);
    if (!list) {
      return null;
    }
    return new ListSchema(list);
  }

  static findOrCreate(_id: string): ListSchema {
    const list = ListSchema._databaseConnection.findById(_id);
    if (!list) {
      const newList: IListAttributes = {
        _id,
        items: [],
      };
      ListSchema._databaseConnection.insert(newList);
      return new ListSchema(newList);
    }

    return new ListSchema(list);
  }

  static findAll(): ListSchema[] {
    const lists = ListSchema._databaseConnection.find();
    return lists.map((list) => new ListSchema(list));
  }
}
