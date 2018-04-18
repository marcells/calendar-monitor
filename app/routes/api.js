const express = require('express');
const moment = require('moment');
const iCal = require('./iCal');

function create(configuration, crawlers) {
  const router = express.Router();

  router.get('/nextCalendars/:numberOfCalendars', (req, res, next) => {
    const numberOfCalendars = parseInt(req.params.numberOfCalendars);
    const iterations = [...Array(numberOfCalendars).keys()];
    const calendars = iterations
      .map(x => moment().add(x, 'months'))
      .map(x => ({ year: x.year(), month: x.month() }));

    res.send({ calendars : calendars });
  });

  router.get('/calendars', (req, res, next) => {
    const calendars = configuration.calendars.map(x => ({
      id: x.id,
      description: x.description
    }));

    res.send({ calendars: calendars });
  });

  router.get('/calendar/:calendar/:year/:month', (req, res, next) => {
    const year = parseInt(req.params.year);
    const month = parseInt(req.params.month);

    const dateForDay = moment(new Date(year, month, 1));
    const eventsForMonth = crawlers
      .getFor(req.params.calendar)
      .getEvents()
      .filter(x => dateForDay.isBetween(x.from, x.to, 'month', '[]'));

    res.send({
      date: { year: year, month: month },
      events : eventsForMonth
    });
  });

  router.get('/upcoming/:calendar', (req, res, next) => {
    const events = [...crawlers.getFor(req.params.calendar).getEvents()]
      .sort((x, y) => x.from - y.from)
      .filter(x => moment(x.from) > moment());

    res.send({ events : events });
  });

  router.get('/events/:calendar', (req, res, next) => {
    const events = crawlers.getFor(req.params.calendar).getEvents();

    res.send(events);
  });

  router.get('/events/byId/:id', (req, res, next) => {
    const event = crawlers.getEventById(req.params.id);

    res.send(!event ? 404 : event);
  });

  router.get('/iCal/:calendar', (req, res, next) => {
    iCal.serve(res, crawlers, req.params.calendar);
  });

  return router;
};

module.exports = create;
