import 'jasmine';
import * as supertest  from 'supertest';
import * as nock from 'nock';
import app from '../src/app';

process.env.MARKET_DATA_URL='https://example.com/market-data/test';
process.env['MARKET_DATA_TOKEN']='test234';

const MOCK_RESPONSE = { statusCode: 200, body: 'Mock Response'};

describe('GET /market-data', () => {

    beforeEach(() => {
        nock('https://example.com')
            .get('/market-data/test')
            .reply(MOCK_RESPONSE.statusCode, MOCK_RESPONSE.body);
    });

    it('should return 200 OK', async () => {
        await supertest(app).get('/market-data/test')
            .expect(MOCK_RESPONSE);
    })
})