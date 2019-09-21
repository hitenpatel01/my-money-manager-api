import { inspect } from 'util';
import { Response, Request, Router } from 'express';

const echoRouteHandler = Router();

echoRouteHandler.all('/', (_req: Request, res: Response) => {
    res.send(inspect(_req));
});

export { echoRouteHandler };
