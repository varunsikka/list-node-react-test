/**
 *
 *
 * In memory Datastore
 */

interface Args {
  _id: string;
}

export class DataStore<T extends Args> {
  private collection: T[];

  constructor() {
    this.collection = [];
  }

  get data(): T[] {
    return this.collection;
  }

  set data(value: T[]) {
    this.collection = value;
  }

  insert(row: T): void {
    if (this.findById(row._id)) {
      throw new Error('Primary key already exists');
    }
    this.collection.push(row);
  }

  update(collectionData: T): void {
    const index = this.collection.findIndex(
      (data) => data._id === collectionData._id,
    );
    this.collection[index] = collectionData;
  }

  find(): T[] {
    return this.collection;
  }

  findById(_id: string): T | undefined {
    const dataCollection: T[] = this.collection;
    return dataCollection.find((list) => list._id === _id);
  }

  remove(collectionData: T): void {
    const index = this.collection.findIndex(
      (data) => data._id === collectionData._id,
    );
    this.collection.splice(index, 1);
  }
}
