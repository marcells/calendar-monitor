const EventEmitter = require('events').EventEmitter;
const CalendarCrawler = require('./CalendarCrawler');

class Crawlers extends EventEmitter {
  constructor(configuration) {
    super();

    this._crawlers = {};

    for (const calendar of configuration.calendars) {
      const crawler = new CalendarCrawler(calendar, configuration.tags);
      crawler.start();

      this._crawlers[calendar.id] = crawler;

      crawler.on('eventsLoaded', () => this.emit('eventsLoaded'));
    }
  }

  getFor(id) {
    return this._crawlers[id];
  }

  getEventById(id) {
    return this
      ._crawlers
      .reduce((x, y) => x.concat(y))
      .find(x => x.id === id);
  }
}

module.exports = Crawlers;
