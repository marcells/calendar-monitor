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
  console.log("Unhandled promise rejection:");
  console.log(r);
  process.abort();
});

// Allow killing from docker container
process.on('SIGINT', function() {
  console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
  process.exit(1);
});

// setup express
app.set('port', process.env.PORT || 3001);
app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/api', createApi(configuration, crawlers));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(app.get('port'));
