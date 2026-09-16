'use strict';

const express = require('express');
const { Book } = require('../models');

const router = express.Router();

router.post('/book', async (req, res, next) => {
  try {
    const record = await Book.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    next(error);
  }
});

router.get('/book', async (req, res, next) => {
  try {
    const records = await Book.findAll();
    res.status(200).json(records);
  } catch (error) {
    next(error);
  }
});

router.get('/book/:id', async (req, res, next) => {
  try {
    const record = await Book.findByPk(req.params.id);
    res.status(200).json(record);
  } catch (error) {
    next(error);
  }
});

router.put('/book/:id', async (req, res, next) => {
  try {
    const record = await Book.findByPk(req.params.id);

    if (!record) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await record.update(req.body);

    res.status(200).json(record);
  } catch (error) {
    next(error);
  }
});

router.delete('/book/:id', async (req, res, next) => {
  try {
    const record = await Book.findByPk(req.params.id);

    if (record) {
      await record.destroy();
    }

    res.status(200).json(null);
  } catch (error) {
    next(error);
  }
});

module.exports = router;