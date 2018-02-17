class CalendarCrawler {
    constructor(calendar, tags) {
        this._calendar = calendar;
        this._tags = tags;
        this._timer = null;
    }

    start() {
        this._timer = setInterval(async () => this._getEvents(), this._calendar.intervalInSeconds * 1000);
    }

    stop() {
        clearInterval(this._timer);
        this._timer = null;
    }

    async _getEvents() {
        for (const providerConfig of this._calendar.providers) {
            const provider = this._createProvider(providerConfig);
            
            await this._parseData(providerConfig, provider);
        }
    }

    _createProvider(providerConfig) {
        const providerClass = require('../providers/' + providerConfig.provider);
    
        return new providerClass(providerConfig.configuration);
    }

    async _parseData(providerConfig, provider) {
        const events = await provider.getEvents();

        events.forEach(event => this._applyForEvent(providerConfig, event));

        events.forEach(x => console.log(x.id, x.tags));
    }

    _applyForEvent(providerConfig, event) {
        event.id = `${this._calendar.id}/${providerConfig.id}/${event.id}`;

        event.tags = providerConfig.tags.map(tag => ({
            name: tag,
            properties: this._tags[tag]
        }))
    }
}

module.exports = CalendarCrawler;
