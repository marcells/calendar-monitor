const EventEmitter = require('events').EventEmitter;

class CalendarCrawler extends EventEmitter {
  constructor(calendar, tags) {
    super();

    this._calendar = calendar;
    this._tags = tags;
    this._timer = null;
    this._allEvents = [];
  }

  async start() {
    await this._loadEvents();
    this._timer = setInterval(async () => this._loadEvents(), this._calendar.intervalInSeconds * 1000);
  }

  stop() {
    clearInterval(this._timer);
    this._timer = null;
  }

  getEvents() {
    return this._allEvents;
  }

  async _loadEvents() {
    const allEvents = [];

    for (const providerConfig of this._calendar.providers) {
      const provider = this._createProvider(providerConfig);

      try {
        var eventsForProvider = await this._loadEventsForProvider(providerConfig, provider);
        eventsForProvider.forEach(event => allEvents.push(event));
      }
      catch (ex) {
        console.log('************************************************************************************************');
        console.log(`Events for provider ${providerConfig.id} (${providerConfig.provider}) could not be loaded!`);
        console.log();
        console.log('Configuration');
        console.log('-------------');
        console.log(providerConfig.configuration);
        console.log();
        console.log('Exception');
        console.log('---------');
        console.log(ex);
        console.log('************************************************************************************************');
      }
    }

    this._allEvents = allEvents;
    this.emit('eventsLoaded');
  }

  _createProvider(providerConfig) {
    const providerClass = require('../providers/' + providerConfig.provider);

    return new providerClass(providerConfig.configuration);
  }

  async _loadEventsForProvider(providerConfig, provider) {
    const events = await provider.getEvents();

    events.forEach(event => this._applyForEvent(providerConfig, event));

    return events;
  }

  _applyForEvent(providerConfig, event) {
    event.id = `${this._calendar.id}/${providerConfig.id}/${event.id}`;

    event.tags = providerConfig.tags.map(tag => ({
      name: tag,
      properties: this._tags[tag]
    }));
  }
}

module.exports = CalendarCrawler;
