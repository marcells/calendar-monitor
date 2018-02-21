class CalendarCrawler {
    constructor(calendar, tags) {
        this._calendar = calendar;
        this._tags = tags;
        this._timer = null;
        this._allEvents = [];
    }

    start() {
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
            
            var eventsForProvider = await this._loadEventsForProvider(providerConfig, provider);
            eventsForProvider.forEach(event => allEvents.push(event));
        }

        this._allEvents = allEvents;
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
