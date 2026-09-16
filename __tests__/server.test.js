'use strict';

const request = require('supertest');

const { app } = require('../src/server');
const { db } = require('../src/models');

beforeAll(async () => {
  await db.sync({ force: true });
});

afterAll(async () => {
  await db.close();
});

describe('API Server', () => {

  test('404 on a bad route', async () => {
    const response = await request(app).get('/bad-route');

    expect(response.status).toEqual(404);
  });

  test('404 on a bad method', async () => {
    const response = await request(app).patch('/food');

    expect(response.status).toEqual(404);
  });

test('creates a food record', async () => {
  const response = await request(app)
    .post('/food')
    .send({
      name: 'Pizza',
      category: 'Dinner',
      calories: 800,
    });

  expect(response.status).toEqual(201);
  expect(response.body.name).toEqual('Pizza');
  expect(response.body.category).toEqual('Dinner');
  expect(response.body.calories).toEqual(800);
  expect(response.body.id).toBeDefined();
});

test('reads a list of food records', async () => {
  const response = await request(app).get('/food');

  expect(response.status).toEqual(200);
  expect(Array.isArray(response.body)).toBe(true);
});

test('reads one food record', async () => {
  const created = await request(app)
    .post('/food')
    .send({
      name: 'Tacos',
      category: 'Dinner',
      calories: 500,
    });

  const id = created.body.id;

  const response = await request(app).get(`/food/${id}`);

  expect(response.status).toEqual(200);
  expect(response.body.id).toEqual(id);
  expect(response.body.name).toEqual('Tacos');
  expect(response.body.category).toEqual('Dinner');
  expect(response.body.calories).toEqual(500);
});

test('updates a food record', async () => {
  const created = await request(app)
    .post('/food')
    .send({
      name: 'Burger',
      category: 'Lunch',
      calories: 600,
    });

  const id = created.body.id;

  const response = await request(app)
    .put(`/food/${id}`)
    .send({
      name: 'Cheeseburger',
      category: 'Lunch',
      calories: 700,
    });

  expect(response.status).toEqual(200);
  expect(response.body.id).toEqual(id);
  expect(response.body.name).toEqual('Cheeseburger');
  expect(response.body.category).toEqual('Lunch');
  expect(response.body.calories).toEqual(700);
});

test('deletes a food record', async () => {
  const created = await request(app)
    .post('/food')
    .send({
      name: 'Salad',
      category: 'Lunch',
      calories: 300,
    });

  const id = created.body.id;

  const response = await request(app).delete(`/food/${id}`);

  expect(response.status).toEqual(200);
  expect(response.body).toEqual(null);
});

});