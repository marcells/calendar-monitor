const fs = require('fs');
const path = require('path');

function readConfiguration() {
    const configurationFileName = path.join(__dirname, 'config.json');

    return JSON.parse(fs.readFileSync(configurationFileName, 'utf8'));
}

module.exports = readConfiguration;