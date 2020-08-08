import * as bodyParser from 'body-parser';
import { map } from 'bluebird';
import express from 'express';
import config from 'config';
import { resolve } from 'path';

const COMPONENTS = [
  {
    component: 'lists',
    route: 'src/components/lists/routes/lists',
  },
];

export class Router {
  private _app: express.Express;

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

  public async initialize() {
    this._app.use(bodyParser.json({}));
    this._app.use(
      bodyParser.urlencoded({
        extended: false,
        limit: '50mb',
        parameterLimit: 50000,
      }),
    );

    await this._loadAllRoutes();
    const PORT = config.get('SERVER_PORT');
    return this._app.listen(PORT, () => {
      console.log(`api server listening on port: ${PORT}`);
    });
  }
}
