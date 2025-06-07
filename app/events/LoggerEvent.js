const events = require('events');
const Logger = require('../helpers/Logger');

// Create an event emitter for logging
const eventEmitter = new events.EventEmitter();

// Set max listeners to avoid memory leak warnings
eventEmitter.setMaxListeners(100);

// Event handler for error logging
eventEmitter.on('logError', ({ controllerName, methodName, error, additionalInfo }) => {
  Logger.logError(controllerName, methodName, error, additionalInfo);
});

// Event handler for info logging
eventEmitter.on('logInfo', ({ controllerName, methodName, message, additionalInfo }) => {
  Logger.logInfo(controllerName, methodName, message, additionalInfo);
});

module.exports = eventEmitter;