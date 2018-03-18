const EventEmitter = require('events').EventEmitter;

class CalendarCrawler extends EventEmitter {
  constructor(calendar, tags) {
    super();

    this._calendar = calendar;
    this._tags = tags;
    this._timer = null;
    this._allEvents = [];
    this._providers = this._calendar
      .providers
      .reduce((map, providerConfig) => {
        map[providerConfig.id] = this._createProvider(providerConfig);
        return map;
      }, {});
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
      const provider = this._providers[providerConfig.id];

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

    return events.map(originalEvent => {
      const event = {
        id: originalEvent.id,
        title: originalEvent.title,
        description: originalEvent.description,
        location: originalEvent.location,
        from: originalEvent.from,
        to: originalEvent.to
      };

      this._applyForEvent(providerConfig, event);

      return event;
    });
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
