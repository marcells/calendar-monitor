const express = require('express');
const path = require('path');
const api = require('./routes/api');

const readConfiguration = require('./readConfiguration');
const CalendarCrawler = require('./crawler/CalendarCrawler');

const app = express();

const configuration = readConfiguration();

for (const calendar of configuration.calendars) {
  const crawler = new CalendarCrawler(calendar, configuration.tags);
  
  crawler.start();
}

app.set('port', process.env.PORT || 3001);

app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/api', api);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(app.get('port'));