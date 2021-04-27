'use strict';

const { server } = require('../src/server');
const supertest = require('@code-fellows/supergoose');
const request = supertest(server);

// ========================================

describe('AUTH SERVER', () => {
  it('Should POST to /signup to create a new user', async () => {
    const response = await request.post('/signup/').send({ "username":"testUser", "password":"testpw" });
    expect(response.status).toBe(201);
  });

  it('POST to /signin to login as a user (use basic auth)', async () => {

  });
});
