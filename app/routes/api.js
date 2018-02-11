const express = require('express');
const moment = require('moment');
const router = express.Router();
const data = require('../services/data');

router.get('/nextCalendars/:numberOfCalendars', (req, res, next) => {
  const numberOfCalendars = parseInt(req.params.numberOfCalendars);
  const iterations = [...Array(numberOfCalendars).keys()];
  const calendars = iterations
    .map(x => moment().add(x, 'months'))
    .map(x => ({ year: x.year(), month: x.month() }));

  res.send({ calendars : calendars });
});

router.get('/calendar/:year/:month', (req, res, next) => {
  const year = parseInt(req.params.year);
  const month = parseInt(req.params.month);

  res.send({ events : data });
});

router.get('/upcoming', (req, res, next) => {
  res.send({ events : data });
});

module.exports = router;
