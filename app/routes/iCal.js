const iCal = require('ical.js');

function create(crawlers, calendar) {
  const events = crawlers.getFor(calendar).getEvents();

  const component = new iCal.Component(['vcalendar', [], []]);
  component.updatePropertyWithValue('prodid', `-//Calendar Monitor Feed for calendar ${calendar}`);

  for (const event of events) {
    const vevent = new iCal.Component('vevent');
    const iCalEvent = new iCal.Event(vevent);

    if (event.id) iCalEvent.uid = event.id;
    if (event.title) iCalEvent.summary = event.title;
    if (event.description) iCalEvent.description = event.description;
    if (event.location) iCalEvent.location = event.location;
    if (event.from) iCalEvent.startDate = iCal.Time.fromJSDate(event.from);
    if (event.to) iCalEvent.endDate = iCal.Time.fromJSDate(event.to);

    component.addSubcomponent(vevent);
  }

  return component.toString();
}

function serve(response, crawlers, calendar) {
  const iCalContent = create(crawlers, calendar);

  response.writeHead(200, {
    'Content-Type': 'text/calendar; charset=utf-8',
    'Content-Disposition': 'attachment; filename="calendar.ics"'
  });

  response.end(iCalContent);
}

module.exports = {
  serve
};
