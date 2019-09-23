import { Response, Request, Router } from 'express';

import { DynamoDB } from 'aws-sdk';

let options = {};

if (process.env.IS_OFFLINE) {
    options = {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
    };
}

const portfolioRouteHandler = Router();
const db = new DynamoDB.DocumentClient(options);

portfolioRouteHandler.get('/', (_req: Request, res: Response) => {
    const params = {
        TableName: process.env.PORTFOLIO_TABLE,
    };

    db.scan(params, (err, result) => {
        err && res.status(500).send(err.message);
        res.send(result && result.Items);
    });

}).post('/:id', (req: Request, res: Response) => {

    const params = {
        TableName: process.env.PORTFOLIO_TABLE,
        Item : {
            id: req.params['id'],
            symbol: req.body
        }
    };

    db.put(params, (err) => {
        err && res.status(500).send(err.message);
        res.send(201);
    });
}); /*.put('/', (_req: Request, res: Response) => {
    res.send(500);
}).delete('/', (_req: Request, res: Response) => {
    res.send(500);
})*/

export { portfolioRouteHandler };
