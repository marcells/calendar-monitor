const express = require('express');
const path = require('path');
const createApi = require('./routes/api');

const readConfiguration = require('./readConfiguration');
const Crawlers = require('./crawler/Crawlers');

const app = express();

const configuration = readConfiguration();
const crawlers = new Crawlers(configuration);

crawlers.on('eventsLoaded', () => console.log('events loaded...'));

app.set('port', process.env.PORT || 3001);

app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/api', createApi(crawlers));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(app.get('port'));