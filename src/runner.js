require('log-timestamp');
var graph = require('./graph');
var tokens = require('./tokens');
const homeAssistant = require('./homeAssistant');

async function execute(req) {
    var accessToken = await tokens.getAccessToken(req);
    var presence = await graph.getPresence(accessToken, req);
    console.log(`Got presence response: ${JSON.stringify(presence)}`);
    processPresence(presence)
}

async function processPresence (presence) {
    var availability = presence.availability;
    console.log(availability)
    switch (availability) {
        case 'Busy':
        case 'BusyIdle':
        case 'DoNotDisturb':
            homeAssistant.setBusy();
            break;
        case 'Available':
            homeAssistant.setAvailable();
            break;
        default:
            homeAssistant.setAway();
            break;
    }

    return presence;
}

module.exports = {
    execute,
    processPresence,
}