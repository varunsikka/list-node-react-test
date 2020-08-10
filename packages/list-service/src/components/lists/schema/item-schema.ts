import { IItem } from '@varunsikka/items-list-types';

/**
 *
 *
 * @export
 * @class Item
 */
export class ItemSchema implements IItem {
  /**
   *
   *
   * @type {string}
   * @memberof ItemSchema
   */
  content: string;

  set item(item: string) {
    // Create Item
    this.content = item;
  }

  get item() {
    return this.content;
  }
}
