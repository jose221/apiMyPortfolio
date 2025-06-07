const fs = require('fs');
const path = require('path');

class Logger {
  constructor() {
    this.logsDir = path.join(process.cwd(), 'logs');
    this.ensureLogsDirectoryExists();
  }

  /**
   * Ensures that the logs directory exists
   */
  ensureLogsDirectoryExists() {
    if (!fs.existsSync(this.logsDir)) {
      fs.mkdirSync(this.logsDir, { recursive: true });
    }
  }

  /**
   * Ensures that the controller-specific log directory exists
   * @param {string} controllerName - Name of the controller
   * @returns {string} - Path to the controller log directory
   */
  ensureControllerLogDirectoryExists(controllerName) {
    const controllerLogDir = path.join(this.logsDir, controllerName);
    if (!fs.existsSync(controllerLogDir)) {
      fs.mkdirSync(controllerLogDir, { recursive: true });
    }
    return controllerLogDir;
  }

  /**
   * Logs an error to a file
   * @param {string} controllerName - Name of the controller
   * @param {string} methodName - Name of the method
   * @param {Error} error - Error object
   * @param {Object} additionalInfo - Additional information to log
   */
  logError(controllerName, methodName, error, additionalInfo = {}) {
    try {
      const controllerLogDir = this.ensureControllerLogDirectoryExists(controllerName);
      const logFile = path.join(controllerLogDir, 'errors.log');
      
      const timestamp = new Date().toISOString();
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : '';
      
      const logEntry = {
        timestamp,
        controller: controllerName,
        method: methodName,
        error: errorMessage,
        stack: errorStack,
        additionalInfo
      };
      
      const logString = JSON.stringify(logEntry, null, 2);
      
      fs.appendFileSync(logFile, logString + '\n\n');
      
      console.log(`Error logged to ${logFile}`);
    } catch (logError) {
      console.error('Failed to log error:', logError);
    }
  }

  /**
   * Logs information to a file
   * @param {string} controllerName - Name of the controller
   * @param {string} methodName - Name of the method
   * @param {string} message - Message to log
   * @param {Object} additionalInfo - Additional information to log
   */
  logInfo(controllerName, methodName, message, additionalInfo = {}) {
    try {
      const controllerLogDir = this.ensureControllerLogDirectoryExists(controllerName);
      const logFile = path.join(controllerLogDir, 'info.log');
      
      const timestamp = new Date().toISOString();
      
      const logEntry = {
        timestamp,
        controller: controllerName,
        method: methodName,
        message,
        additionalInfo
      };
      
      const logString = JSON.stringify(logEntry, null, 2);
      
      fs.appendFileSync(logFile, logString + '\n\n');
    } catch (logError) {
      console.error('Failed to log info:', logError);
    }
  }
}

module.exports = new Logger();