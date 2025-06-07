const loggerEvent = require('../app/events/LoggerEvent');

/**
 * Base controller class with logging functionality
 */
class LoggerModule {
  /**
   * Get the name of the controller
   * @returns {string} - Name of the controller
   */
  getControllerName() {
    return this.constructor.name;
  }

  /**
   * Log an error
   * @param {string} methodName - Name of the method
   * @param {Error} error - Error object
   * @param {Object} additionalInfo - Additional information to log
   */
  logError(methodName, error, additionalInfo = {}) {
    loggerEvent.emit('logError', {
      controllerName: this.getControllerName(),
      methodName,
      error,
      additionalInfo
    });
  }

  /**
   * Log information
   * @param {string} methodName - Name of the method
   * @param {string} message - Message to log
   * @param {Object} additionalInfo - Additional information to log
   */
  logInfo(methodName, message, additionalInfo = {}) {
    loggerEvent.emit('logInfo', {
      controllerName: this.getControllerName(),
      methodName,
      message,
      additionalInfo
    });
  }

  /**
   * Log a validation error
   * @param {string} methodName - Name of the method
   * @param {Object} error - Validation error object
   * @param {Object} params - Request parameters
   */
  logValidationError(methodName, error, params = {}) {
    this.logError(
      methodName,
      new Error(error.details[0].message),
      { params, validationDetails: error.details }
    );
  }
}

module.exports = LoggerModule;