import { Router, NextFunction, Request, Response } from 'express';

import { ListService } from 'src/components/lists/list-service';

export const router = Router();

router.use('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    new ListService();
    return res.json({
      ok: 'passed',
    });
  } catch (err) {
    next();
  }
});
