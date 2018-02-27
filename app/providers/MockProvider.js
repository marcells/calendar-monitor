const moment = require('moment');

function generateEvents (configuration) {
  const iterations = [...Array(configuration.monthsFromNow).keys()];
  const calendars = iterations
    .map(x => moment().add(x, 'months'))
    .map(x => ({ year: x.year(), month: x.month() }));

  const events = calendars
    .map(x => generateEventsForCalendar(configuration, x.year, x.month))
    .reduce((x, y) => x.concat(y));

  return events;
}

function generateEventsForCalendar (configuration, year, month) {
  const numberOfEvents = getRandomBetween(configuration.numberOfEventsPerMonth.minimum, configuration.numberOfEventsPerMonth.maximum + 1);

  return [...Array(numberOfEvents).keys()]
    .map(x => ({
      id: x,
      eventTime: getRandomEventTime(configuration, year, month)
    }))
    .map(x => ({
      id: `${year}#${month}#${x.id}`,
      from: x.eventTime.from,
      to: x.eventTime.to,
      title: getRandomText(configuration)
    }));
}

function getRandomText (configuration) {
  const numberOfWords = getRandomBetween(1, 10);

  return [...Array(numberOfWords).keys()]
    .map(x => configuration.randomWords[getRandomBetween(0, configuration.randomWords.length)])
    .join(' ');
}

function getRandomEventTime (configuration, year, month) {
  const fromDuration = getRandomDuration(configuration.fromTime);
  const eventDuration = getRandomDuration(configuration.duration);

  const date = getRandomFromDate(configuration, year, month);
  const fromDate = moment(date).add(fromDuration);

  const toDateWithDuration = moment(fromDate).add(eventDuration);
  const maximumToDate = moment(date).add(1, 'day');
  const toDate = moment.min(toDateWithDuration, maximumToDate);

  return {
    from: fromDate.toDate(),
    to: toDate.toDate()
  }
}

function getRandomDuration (time) {
  const minimumTimeInMinutes = moment.duration({ hours: time.minimum.hours, minutes: time.minimum.minutes }).asMinutes();
  const maximumTimeInMinutes = moment.duration({ hours: time.maximum.hours, minutes: time.maximum.minutes }).asMinutes();
  const steps = (maximumTimeInMinutes - minimumTimeInMinutes) / time.stepInMinutes;

  const randomSteps = getRandomBetween(0, steps);

  return moment.duration({ minutes: minimumTimeInMinutes + randomSteps * time.stepInMinutes });
}

function getRandomFromDate (configuration, year, month) {
  const fromMonth = moment({ year, month });
  const daysInMonth = fromMonth.daysInMonth();

  for (;;) {
    const days = getRandomBetween(0, daysInMonth);
    const fromDate = moment(fromMonth).add(days, 'day');

    if (configuration.allowedWeekdays.includes(fromDate.weekday())) {
      return fromDate;
    }
  }
}

function getRandomBetween (min, max) {
  const minimum = Math.ceil(min);
  const maximum = Math.floor(max);

  return Math.floor(Math.random() * (maximum - minimum)) + minimum;
}

class MockProvider {
  constructor (configuration) {
    this._configuration = configuration;
  }

  async getEvents () {
    return new Promise((resolve, reject) => {
      if (!this._generatedEvents) {
        this._generatedEvents = generateEvents(this._configuration);
      }

      resolve(this._generatedEvents);
    });
  }
}

module.exports = MockProvider;
