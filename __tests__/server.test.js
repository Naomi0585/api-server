'use strict';

const supertest = require('supertest');

const { app } = require('../src/server');
const { db } = require('../src/models');

const request = supertest(app);

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
  await db.close();
});

describe('API Server', () => {

  // -------------------------
  // 404 TESTS
  // -------------------------

  test('returns 404 on a bad route', async () => {
    const response = await request.get('/not-a-route');

    expect(response.status).toEqual(404);
  });

  test('returns 404 on a bad method', async () => {
    const response = await request.patch('/authors');

    expect(response.status).toEqual(404);
  });


  // -------------------------
  // AUTHOR CRUD TESTS
  // -------------------------

  test('creates an author using POST', async () => {
    const response = await request
      .post('/authors')
      .send({
        name: 'J.R.R. Tolkien',
        country: 'United Kingdom',
      });

    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('J.R.R. Tolkien');
    expect(response.body.country).toEqual('United Kingdom');
    expect(response.body.id).toBeDefined();
  });

  test('reads a list of authors using GET', async () => {
    const response = await request.get('/authors');

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('reads one author using GET', async () => {
    const response = await request.get('/authors/1');

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.name).toEqual('J.R.R. Tolkien');
  });

  test('updates an author using PUT', async () => {
    const response = await request
      .put('/authors/1')
      .send({
        country: 'England',
      });

    expect(response.status).toEqual(200);
    expect(response.body.country).toEqual('England');
  });


  // -------------------------
  // BOOK CRUD TESTS
  // -------------------------

  test('creates a book using POST', async () => {
    const response = await request
      .post('/books')
      .send({
        title: 'The Hobbit',
        genre: 'Fantasy',
        authorId: 1,
      });

    expect(response.status).toEqual(201);
    expect(response.body.title).toEqual('The Hobbit');
    expect(response.body.genre).toEqual('Fantasy');
    expect(response.body.authorId).toEqual(1);
    expect(response.body.id).toBeDefined();
  });

  test('reads a list of books using GET', async () => {
    const response = await request.get('/books');

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('reads one book using GET', async () => {
    const response = await request.get('/books/1');

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.title).toEqual('The Hobbit');
  });

  test('updates a book using PUT', async () => {
    const response = await request
      .put('/books/1')
      .send({
        genre: 'High Fantasy',
      });

    expect(response.status).toEqual(200);
    expect(response.body.genre).toEqual('High Fantasy');
  });


  // -------------------------
  // ASSOCIATION TEST
  // -------------------------

  test('author includes associated books', async () => {
    const response = await request.get('/authors/1');

    expect(response.status).toEqual(200);

    // Sequelize usually names the hasMany property "Books"
    expect(response.body.Books).toBeDefined();
    expect(Array.isArray(response.body.Books)).toBe(true);
    expect(response.body.Books[0].title).toEqual('The Hobbit');
  });


  // -------------------------
  // DELETE TESTS
  // -------------------------

  test('deletes a book using DELETE', async () => {
    const response = await request.delete('/books/1');

    expect(response.status).toEqual(200);
    expect(response.body).toBeNull();
  });

  test('deletes an author using DELETE', async () => {
    const response = await request.delete('/authors/1');

    expect(response.status).toEqual(200);
    expect(response.body).toBeNull();
  });

});