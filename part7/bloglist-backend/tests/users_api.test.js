const app = require('../app');
const mongoose = require('mongoose');
const supertest = require('supertest');
//const User = require('../models/user');

const api = supertest(app);

describe('user api tests', () => {

    it('shold give clear error message for psw', async () => {
        const test = {
            username: 'Adam'
        };

        const response = await api.post('/api/users')
            .send(test)
            .expect(400);

        const err = JSON.parse(response.text);
        expect(err.error).toBe('password must be at least 3 characters long');
    });

    it('shold give clear error message for psw', (done) => {
        const test = {
            password: 'Adam'
        };
        api.post('/api/users')
            .send(test)
            .end(function (err, res) {
                if (err) {
                    console.log(err);
                } else {
                    const errors = JSON.parse(res.text);
                    expect(errors.errors.username.name).toBe('ValidatorError');
                    expect(errors.errors.username.message).toBe('Path `username` is required.');
                }
                done();
            });
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});