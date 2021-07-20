const logger = require('../config/logger');

const exitHandler = (server) => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

module.exports = (error, server) => {
  logger.error(error);
  exitHandler(server);
};
