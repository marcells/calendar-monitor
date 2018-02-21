const CalendarCrawler = require('./CalendarCrawler');

class Crawlers {
    constructor(configuration) {
        this._crawlers = { };

        for (const calendar of configuration.calendars) {
            const crawler = new CalendarCrawler(calendar, configuration.tags);
            crawler.start();

            this._crawlers[calendar.id] = crawler;
        }
    }

    getFor(id) {
        return this._crawlers[id];
    }
}

module.exports = Crawlers;