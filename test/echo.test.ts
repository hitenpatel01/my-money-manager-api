import 'jasmine';
import * as supertest  from 'supertest';
import app from '../src/app';

describe('GET /echo', () => {
    it('should return 200 OK', async () => {
        const res = await supertest(app).get('/echo?param1=value1')
        expect(JSON.stringify(res)).toContain('param1=value1');
    })
})
