'use strict';

const express = require('express');

const router = express.Router();

const {
  bookCollection,
} = require('../models');

router.post('/books', async (req, res, next) => {
  try {
    const book = await bookCollection.create(req.body);

    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
});

router.get('/books', async (req, res, next) => {
  try {
    const books = await bookCollection.read();

    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
});

router.get('/books/:id', async (req, res, next) => {
  try {
    const book = await bookCollection.read(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: 'Book not found',
      });
    }

    const result = book.toJSON();

    result.author = `/authors/${book.authorId}`;

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.put('/books/:id', async (req, res, next) => {
  try {
    const book = await bookCollection.update(
      req.params.id,
      req.body
    );

    if (!book) {
      return res.status(404).json({
        message: 'Book not found',
      });
    }

    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
});

router.delete('/books/:id', async (req, res, next) => {
  try {
    await bookCollection.delete(req.params.id);

    res.status(200).json(null);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

