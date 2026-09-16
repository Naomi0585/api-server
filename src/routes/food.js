'use strict';

const express = require('express');
const { Food } = require('../models');

const router = express.Router();

router.post('/food', async (req, res, next) => {
  try {
    const record = await Food.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    next(error);
  }
});

router.get('/food', async (req, res, next) => {
  try {
    const records = await Food.findAll();
    res.status(200).json(records);
  } catch (error) {
    next(error);
  }
});

router.get('/food/:id', async (req, res, next) => {
  try {
    const record = await Food.findByPk(req.params.id);
    res.status(200).json(record);
  } catch (error) {
    next(error);
  }
});

router.put('/food/:id', async (req, res, next) => {
  try {
    const record = await Food.findByPk(req.params.id);

    if (!record) {
      return res.status(404).json({ message: 'Food not found' });
    }

    await record.update(req.body);

    res.status(200).json(record);
  } catch (error) {
    next(error);
  }
});

router.delete('/food/:id', async (req, res, next) => {
  try {
    const record = await Food.findByPk(req.params.id);

    if (record) {
      await record.destroy();
    }

    res.status(200).json(null);
  } catch (error) {
    next(error);
  }
});

module.exports = router;