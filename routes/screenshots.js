const express = require('express');
const router = express.Router();

const Screenshot = require('../models/Screenshot');

router
  .route('/')
  .get(async (req, res) => {
    let query = Screenshot.find();

    if (req.query.ids) query = query.where({ _id: req.query.ids });
    if (req.query.ordering) query = query.sort(req.query.ordering.join(' '));

    const screenshots = await query;

    res.json(screenshots);
  })
  .post(async (req, res) => {
    const body = { ...req.body };
    const count = await Screenshot.countDocuments({ project: body.project });
    body.priorityOrder = count + 1;

    const screenshot = await Screenshot.create(body);
    res.status(201).json(screenshot);
  });

router.delete('/:id', async (req, res) => {
  const screenshot = await Screenshot.findByIdAndDelete(req.params.id);
  res.json(screenshot);
});

module.exports = router;
