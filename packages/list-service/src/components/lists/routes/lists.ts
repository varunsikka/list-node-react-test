import { Router, NextFunction, Request, Response } from 'express';

import { ListService } from 'src/components/lists/list-service';
import { IListAttributes, IAddItemRequest } from '@varunsikka/items-list-types';
import { ListSchema } from '../schema/list-schema';
import { DataStore } from 'src/adapters/datastore';

export const router = Router();

// Initialize and Setup datastore connections
ListSchema._databaseConnection = new DataStore<IListAttributes>();

// Initialize and Inject the service with the Model
const listService = new ListService({
  ListSchema,
});

router.get(
  '/',
  (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Response<IListAttributes[]> => {
    try {
      const allLists: IListAttributes[] = listService.getAllLists();
      return res.json(allLists);
    } catch (err) {
      next(err);
    }
  },
);

router.get(
  '/:token',
  (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Response<IListAttributes> => {
    const { token } = req.params;
    try {
      const list = listService.getList(token);
      return res.json(list);
    } catch (err) {
      next(err);
    }
  },
);

router.post('/:token', (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.params;
  const { _id, content }: IAddItemRequest = req.body;
  try {
    listService.addToList({
      _id: String(token),
      item: { _id, content },
    });
    // Send 201 Created response
    return res.status(201).send();
  } catch (err) {
    next(err);
  }
});

router.delete(
  '/:token/:item',
  (req: Request, res: Response, next: NextFunction) => {
    const { token, item } = req.params;
    try {
      listService.removeFromList({
        _id: token,
        item: item,
      });
      return res.status(202);
    } catch (err) {
      next(err);
    }
  },
);

router.delete('/:token', (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.params;
  try {
    listService.resetList(token);
    return res.status(202);
  } catch (err) {
    next(err);
  }
});
