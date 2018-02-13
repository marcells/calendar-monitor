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

router.get('/calendar/:year/:month', async (req, res, next) => {
  const year = parseInt(req.params.year);
  const month = parseInt(req.params.month);

  const dateForDay = moment(new Date(year, month, 1));
  const eventsForMonth = (await data.getEvents()).filter(x => dateForDay.isBetween(x.from, x.to, 'month', '[]'));

  res.send({
    date: { year: year, month: month },
    events : eventsForMonth
  });
});

router.get('/upcoming', async (req, res, next) => {
  const events = [...(await data.getEvents())]
    .sort((x, y) => x.from - y.from)
    .filter(x => moment(x.from) > moment());

  res.send({ events : events });
});

router.get('/events', async (req, res, next) => {
  const events = await data.getEvents();

  res.send(events);
});

module.exports = router;
