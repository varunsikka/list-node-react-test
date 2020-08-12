import { ListService } from 'src/components/lists/list-service';
import { ListSchema } from 'src/components/lists/schema/list-schema';
import { stub, restore } from 'sinon';
import sinonChai from 'sinon-chai';
import chai, { expect } from 'chai';
import { IAddItem, IListAttributes } from '@varunsikka/items-list-types';
import { DataStore } from 'src/adapters/datastore';

chai.use(sinonChai);

let listService: ListService;

const dependencies = {
  ListSchema: ListSchema,
};

const mockList: IListAttributes = {
  _id: '1234',
  items: [
    {
      _id: 'aabbcc',
      content: 'This is some data',
    },
  ],
};

const mockItem: IAddItem = {
  _id: '1234',
  item: {
    _id: 'aabbcc',
    content: 'This is some data',
  },
};

const listInstance: ListSchema = new ListSchema(mockList);

const _databaseConnection: DataStore<IListAttributes> = new DataStore<
  IListAttributes
>();

let dependenciesListSchemaFindStub: stub;
describe('list-service', () => {
  beforeEach(() => {
    // Stub database connection
    stub(_databaseConnection, 'insert').callsFake();
    stub(_databaseConnection, 'remove').callsFake();
    stub(_databaseConnection, 'update').callsFake();
    stub(_databaseConnection, 'find').callsFake(() => [mockList]);
    stub(_databaseConnection, 'findById').callsFake(() => mockList);

    // Stub ListSchema
    ListSchema._databaseConnection = _databaseConnection;
    stub(listInstance, 'add').callsFake();
    stub(listInstance, 'remove').callsFake();
    stub(listInstance, 'reset').callsFake();
    stub(dependencies.ListSchema, 'findOrCreate').callsFake(() => listInstance);
    dependenciesListSchemaFindStub = stub(
      dependencies.ListSchema,
      'find',
    ).callsFake(() => listInstance);

    // Initialize listService
    listService = new ListService(dependencies);
  });

  it('should add new item to list', () => {
    expect(listService).to.be.an('object');
    const addList = listService.addToList(mockItem);
    expect(addList).to.be.an('undefined');
  });

  it('should remove item to list', () => {
    expect(listService).to.be.an('object');
    const removeList = listService.removeFromList({
      _id: mockItem._id,
      item: mockItem.item._id,
    });
    expect(removeList).to.be.an('undefined');
  });

  it('should update item in a list', () => {
    expect(listService).to.be.an('object');
    const returnValue = listService.updateItem(mockItem);
    expect(returnValue).to.be.an('undefined');
  });

  it('should get a list', () => {
    expect(listService).to.be.an('object');
    const list = listService.getList('1234');
    expect(list).to.be.an('object');
    expect(list).to.have.nested.property('_id');
    expect(list).to.have.nested.property('_id').equal('1234');
    expect(list).to.have.all.keys('_id', 'items');
  });

  it('should get an empty list', () => {
    dependenciesListSchemaFindStub.restore();
    stub(dependencies.ListSchema, 'find').callsFake(() => null);
    expect(listService).to.be.an('object');
    const list = listService.getList('1234');
    expect(list).to.be.an('array').that.is.empty;
  });

  it('should get all lists', () => {
    expect(listService).to.be.an('object');
    const getAllLists = listService.getAllLists();
    expect(getAllLists).to.be.an('array').that.is.empty;
  });

  it('should reset list', () => {
    expect(listService).to.be.an('object');
    const returnValue = listService.resetList('1234');
    expect(returnValue).to.be.an('undefined');
  });

  afterEach(() => {
    restore();
  });
});
