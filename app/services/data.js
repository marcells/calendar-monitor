const axios = require('axios');
const iCal = require('ical.js');

const events = [
  {
    id: 1,
    title: 'Event 1',
    from: new Date(2018, 1, 1, 19, 0, 0),
    to: new Date(2018, 1, 1, 22, 0, 0)
  },
  {
    id: 2,
    title: 'Event 2',
    from: new Date(2018, 1, 20, 19, 0, 0),
    to: new Date(2018, 1, 20, 22, 0, 0)
  },
  {
    id: 3,
    title: 'Event 3',
    from: new Date(2018, 1, 20, 19, 0, 0),
    to: new Date(2018, 1, 20, 22, 0, 0)
  },
  {
    id: 4,
    title: 'Event 4',
    from: new Date(2018, 1, 23, 19, 0, 0),
    to: new Date(2018, 1, 23, 22, 0, 0)
  },
  {
    id: 5,
    title: 'Event 5',
    from: new Date(2018, 2, 23, 19, 0, 0),
    to: new Date(2018, 2, 23, 22, 0, 0)
  },
  {
    id: 6,
    title: 'Event 6',
    from: new Date(2018, 2, 23, 19, 0, 0),
    to: new Date(2018, 2, 23, 22, 0, 0)
  },
  {
    id: 7,
    title: 'Event 7 with some unbelievable long tile',
    from: new Date(2018, 1, 13, 19, 0, 0),
    to: new Date(2018, 1, 13, 22, 0, 0)
  },
  {
    id: 8,
    title: 'Event 8',
    from: new Date(2018, 1, 13, 23, 0, 0),
    to: new Date(2018, 1, 13, 23, 30, 0)
  }
];

getEventsFromIcal = async function (calendarUrl) {
  const response = await axios.get(calendarUrl);
  
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
};

getEventsFromMocks = async function () {
  return new Promise((resolve, reject) => resolve(events));
}

getEvents = async function () {
  // return getEventsFromMocks();
  return getEventsFromIcal('');
}

module.exports = {
  getEvents: getEvents
};