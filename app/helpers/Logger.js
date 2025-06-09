const fs = require('fs');
const path = require('path');

class Logger {
  constructor() {
    this.logsDir = path.join(process.cwd(), 'logs');
    this.ensureLogsDirectoryExists();
    this.timeZone = 'America/Cancun';
  }

  ensureLogsDirectoryExists() {
    if (!fs.existsSync(this.logsDir)) {
      fs.mkdirSync(this.logsDir, { recursive: true });
    }
  }

  ensureControllerLogDirectoryExists(controllerName) {
    const controllerLogDir = path.join(this.logsDir, controllerName);
    if (!fs.existsSync(controllerLogDir)) {
      fs.mkdirSync(controllerLogDir, { recursive: true });
    }
    return controllerLogDir;
  }

  // Timestamp en hora de Cancún y formato ISO-like
  getTimestamp() {
    const date = new Date();
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3,
      hour12: false,
      timeZone: this.timeZone
    };
    const parts = new Intl.DateTimeFormat('sv-SE', options).formatToParts(date);

    const year = parts.find(p => p.type === 'year').value;
    const month = parts.find(p => p.type === 'month').value;
    const day = parts.find(p => p.type === 'day').value;
    const hour = parts.find(p => p.type === 'hour').value;
    const minute = parts.find(p => p.type === 'minute').value;
    const second = parts.find(p => p.type === 'second').value;
    const fraction = parts.find(p => p.type === 'fraction')?.value ?? '000';

    return `${year}-${month}-${day}T${hour}:${minute}:${second}.${fraction}-05:00`; // GMT-5 fijo
  }

  logError(controllerName, methodName, error, additionalInfo = {}) {
    try {
      const controllerLogDir = this.ensureControllerLogDirectoryExists(controllerName);
      const logFile = path.join(controllerLogDir, 'errors.log');
      
      const timestamp = this.getTimestamp();
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

  logInfo(controllerName, methodName, message, additionalInfo = {}) {
    try {
      const controllerLogDir = this.ensureControllerLogDirectoryExists(controllerName);
      const logFile = path.join(controllerLogDir, 'info.log');
      
      const timestamp = this.getTimestamp();
      
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