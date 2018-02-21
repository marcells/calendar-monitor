const express = require('express');
const moment = require('moment');

function create(crawlers) {
  const router = express.Router();

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

    const dateForDay = moment(new Date(year, month, 1));
    const eventsForMonth = crawlers
      .getFor('all')
      .getEvents()
      .filter(x => dateForDay.isBetween(x.from, x.to, 'month', '[]'));

    res.send({
      date: { year: year, month: month },
      events : eventsForMonth
    });
  });

  router.get('/upcoming', (req, res, next) => {
    const events = [...crawlers.getFor('all').getEvents()]
      .sort((x, y) => x.from - y.from)
      .filter(x => moment(x.from) > moment());

    res.send({ events : events });
  });

  router.get('/events', (req, res, next) => {
    const events = crawlers.getFor('all').getEvents();

    res.send(events);
  });

  return router;
};

module.exports = create;
