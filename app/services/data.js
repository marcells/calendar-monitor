const ICalendarProvider = require('../providers/ICalendarProvider');
const MockProvider = require('../providers/MockProvider');

getICalendarProvider = function (calendarUrl) {
  return new ICalendarProvider(calendarUrl);
};

getMockProvider = function () {
  return new MockProvider();
}

getEvents = async function () {
  const provider = getICalendarProvider('');
  const provider = getMockProvider();

  return await provider.getEvents();
}

module.exports = {
  getEvents: getEvents
};