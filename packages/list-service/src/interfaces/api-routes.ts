import * as bodyParser from 'body-parser';
import { map } from 'bluebird';
import express, {
  Express,
  Request,
  Response,
  ErrorRequestHandler,
  NextFunction,
} from 'express';
import config from 'config';
import { resolve } from 'path';
import cors from 'cors';

const COMPONENTS = [
  {
    component: 'lists',
    route: 'src/components/lists/routes/lists',
  },
];

export class Router {
  private _app: Express;

  constructor() {
    this._app = express();
  }

  private async _loadAllRoutes() {
    // Load all Routes from components
    const routes = [];
    await map(COMPONENTS, async ({ component, route }) => {
      console.log(`Loading Routes for: ${component} => ${route}`);
      const routeMiddleware = await import(resolve(route));
      this._app.use(`/${component}`, routeMiddleware.router);
    });

    return routes;
  }

  private _handleErrors() {
    this._app.use(
      (
        err: ErrorRequestHandler,
        req: Request,
        res: Response,
        next: NextFunction,
      ) => {
        if (res.headersSent) {
          return next(err);
        }

        return res.status(500).send();
      },
    );
  }

  public async initialize() {
    this._app.use(bodyParser.json({}));
    this._app.use(
      bodyParser.urlencoded({
        extended: false,
        parameterLimit: 50000,
      }),
    );
    this._app.use(cors());

    await this._loadAllRoutes();
    this._handleErrors();
    const PORT = config.get('SERVER_PORT');
    return this._app.listen(PORT, () => {
      console.log(`api server listening on port: ${PORT}`);
    });
  }
}
