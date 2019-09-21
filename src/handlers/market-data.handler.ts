import * as https from 'https';
import { Response, Request, Router } from 'express';

const marketDataRouteHandler = Router();

marketDataRouteHandler.all('/*', async (req: Request, res: Response) => {
    try {

        //Check required environment variables
        if(!process.env.MARKET_DATA_URL) throw new Error(`Missing environment variable: MARKET_DATA_URL`)
        if(!process.env.MARKET_DATA_TOKEN) throw new Error(`Missing environment variable: MARKET_DATA_TOKEN`)
        
        let url = process.env.MARKET_DATA_URL
            .replace('{{proxy}}', req.url.replace('/v1.0/',''))
            .replace('{{token}}', process.env.MARKET_DATA_TOKEN);

        const data = await getExternalData(url);

        res.send(data);
        
    } catch(err) {
        res.status(500).send(err.message);
    }
});

const getExternalData = (url: string) => new Promise<any>((resolve, reject) => {
    https.get(url, (res) => {
        let data = '';
        res.on("data", (chunk)=> data += chunk)
        res.on("end", () => {
            resolve({
                statusCode: res.statusCode,
                body: data
            })
        });
    }).on('error', err => {
        console.error(`Error sending request for market data: ${JSON.stringify(err)}`);
        reject(err)
    });
});

export { marketDataRouteHandler, getExternalData };
