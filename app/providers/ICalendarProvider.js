const axios = require('axios');
const iCal = require('ical.js');

class ICalendarProvider {
  constructor (configuration) {
    this.calendarUrl = configuration.calendarUrl;
  }

  async getEvents () {
    if (!this.calendarUrl)
      throw new Error('Invalid calendar url.');

    const response = await axios.get(this.calendarUrl);

    const jCal = iCal.parse(response.data);
    const component = new ICAL.Component(jCal);
    const vevents = component.getAllSubcomponents("vevent");

    const events = vevents
      .map(vevent => new ICAL.Event(vevent))
      .map(event => ({
        id: event.uid,
        title: event.summary,
        description: event.description,
        location: event.location,
        from: event.startDate.toJSDate(),
        to: event.endDate.toJSDate()
      }));

    return events;
  }
}

module.exports = ICalendarProvider;
