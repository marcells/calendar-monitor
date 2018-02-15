class CalendarCrawler {
    constructor(calendar, tags) {
        this._calendar = calendar;
        this._tags = tags;
        this._providerInstances = [];
        this._timers = [];
    }

    async parseData(provider) {
        const events = await provider.getEvents();

        console.log(events);
    }

    getEvents() {
    }

    start() {
        for (const provider of this._calendar.providers) {
            const providerClass = require('../providers/' + provider.name);
            const providerInstance = new providerClass(provider.configuration);
            
            this._providerInstances.push(providerInstance);

            const timerForProvider = setInterval(
                async () => await this.parseData(providerInstance),
                this._calendar.intervalInSeconds * 1000);

            this._timers.push(timerForProvider);
        }
    }

    stop() {
    }
}

module.exports = CalendarCrawler;