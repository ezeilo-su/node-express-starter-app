const { createLogger, format, transports } = require('winston');

const logsDir = process.env.LOGS_DIRECTORY || 'logs';

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.File({ filename: `${logsDir}/error`, level: 'error' }),
    new transports.File({ filename: `${logsDir}/warn`, level: 'warn' }),
    new transports.File({ filename: `${logsDir}/info` }),
  ],
});

logger.add(
  new transports.Console({
    format: format.combine(format.colorize(), format.simple()),
  })
);

module.exports = logger;
