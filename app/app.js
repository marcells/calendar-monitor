const express = require('express');
const path = require('path');
const createApi = require('./routes/api');
const readConfiguration = require('./readConfiguration');
const Crawlers = require('./crawler/Crawlers');

const app = express();

// read configuration and start crawlers
const configuration = readConfiguration();
const crawlers = new Crawlers(configuration);

crawlers.on('eventsLoaded', () => console.log('events loaded...'));

// better error output for promises
process.on('unhandledRejection', r => {
  console.log(r);
  process.abort();
});

// setup express
app.set('port', process.env.PORT || 3001);
app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/api', createApi(configuration, crawlers));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(app.get('port'));
