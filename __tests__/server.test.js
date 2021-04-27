'use strict';

const { server } = require('../src/server');
const supertest = require('@code-fellows/supergoose');
const { expect } = require('@jest/globals');
const request = supertest(server);

// ========================================

describe('AUTH SERVER', () => {
  it('Should POST to /signup to create a new user', async () => {
    const response = await request
      .post('/signup')
      .send({ username: 'testUser', password: 'testpw' });
    expect(response.status).toBe(201);
    expect(response.body.username).toBe('testUser');
  });

  it('should POST to /signin to login as a user (use basic auth)', async () => {
    const response = await request.post('/signin').auth('testUser', 'testpw');
    expect(response.status).toBe(200);
    expect(response.body.username).toBe('testUser');
  });

  it('should throw 403 on POST to /signin with bad info', async () => {
    const response = await request.post('/signin').auth('testUser', 'X');
    expect(response.status).toBe(403);
  });

  it('should throw 403 on POST to /signup with repeated info', async () => {
    const response = await request.post('/signup').auth('testUser', 'X');
    expect(response.status).toBe(403);
  });

  it('should throw 404 on GET to bad route', async () => {
    const response = await request.get('/foo');
    expect(response.status).toBe(404);
  });
});
