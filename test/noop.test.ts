import 'jasmine';
import * as supertest  from 'supertest';
import app from '../src/app';

describe('GET /noop', () => {
    it('should return 200 OK', async () => {
        await supertest(app).get('/noop')
        .expect(200);
    })
})
