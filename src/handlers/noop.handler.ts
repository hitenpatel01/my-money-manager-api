import { Response, Request, Router } from 'express';

const noopRouteHandler = Router();

noopRouteHandler.all('/', (_req: Request, res: Response) => {
    res.send();
});

export { noopRouteHandler };