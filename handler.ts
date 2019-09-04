import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import * as https from 'https';

export const getMarketData: APIGatewayProxyHandler = async (event, _context) => {
    
    console.info(`Processing request : ${JSON.stringify(event)}`);
    
    try {

        //Check required environment variables
        if(!process.env.MARKET_DATA_URL) throw new Error(`Missing environment variable: MARKET_DATA_URL`)
        if(!process.env.MARKET_DATA_TOKEN) throw new Error(`Missing environment variable: MARKET_DATA_TOKEN`)
        
        let url = process.env.MARKET_DATA_URL
            .replace('{{proxy}}', event.pathParameters.proxy)
            .replace('{{token}}', process.env.MARKET_DATA_TOKEN);
        
        return await getExternalData(url);

    } catch(err) {
        console.error(err);
        return {
            statusCode: 500,
            body: `Error processing request`
        };
    }
}

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