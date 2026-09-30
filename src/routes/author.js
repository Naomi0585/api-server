'use strict';

const express = require('express');

const router = express.Router();

const {
  authorCollection,
  Book,
} = require('../models');

router.post('/authors', async (req, res, next) => {
  try {
    const author = await authorCollection.create(req.body);

    res.status(201).json(author);
  } catch (error) {
    next(error);
  }
});

router.get('/authors', async (req, res, next) => {
  try {
    const authors = await authorCollection.read();

    res.status(200).json(authors);
  } catch (error) {
    next(error);
  }
});

router.get('/authors/:id', async (req, res, next) => {
  try {
    const author = await authorCollection.read(req.params.id, {
      include: [Book],
    });

    if (!author) {
      return res.status(404).json({
        message: 'Author not found',
      });
    }

    res.status(200).json(author);
  } catch (error) {
    next(error);
  }
});

router.put('/authors/:id', async (req, res, next) => {
  try {
    const author = await authorCollection.update(
      req.params.id,
      req.body
    );

    if (!author) {
      return res.status(404).json({
        message: 'Author not found',
      });
    }

    res.status(200).json(author);
  } catch (error) {
    next(error);
  }
});

router.delete('/authors/:id', async (req, res, next) => {
  try {
    await authorCollection.delete(req.params.id);

    res.status(200).json(null);
  } catch (error) {
    next(error);
  }
});

module.exports = router;