import {
  IListAttributes,
  IRemoveItem,
  IAddItem,
} from '@varunsikka/items-list-types';
import { ListSchema } from './schema/list-schema';

/**
 *
 *
 * @export
 * @class ListService
 */
export class ListService {
  private List: ListSchema;

  constructor(dependencies) {
    // Constructor
    this.List = dependencies.ListSchema;
  }

  public addToList(data: IAddItem): void {
    // Add an item to a list
    const { _id, item } = data;
    const listModel = ListSchema.findOrCreate(_id);
    listModel.add({
      _id,
      item,
    });
  }

  public removeFromList(data: IRemoveItem): void {
    // Remove item from the list
    const { _id, item } = data;
    const listInstance = ListSchema.find(_id);
    listInstance.remove(item);
  }

  public getList(_id: string): IListAttributes | [] {
    // Get a List by token
    const listInstance = ListSchema.find(_id);
    return listInstance || [];
  }

  public getAllLists(): IListAttributes[] {
    // Get all the lists
    return [];
  }

  public resetList(_id: string): void {
    // Reset list
    const listInstance = ListSchema.find(_id);
    listInstance.reset();
  }
}
