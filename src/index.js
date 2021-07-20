const mongoose = require('mongoose');
const app = require('./app');
const logger = require('./config/logger');
const config = require('./config/config');
const unexpectedErrorHandler = require('./utils/unexpectedErrorHandler');

let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
});

process.on('uncaughtException', (error) => unexpectedErrorHandler(error, server));
process.on('unhandledRejection', (error) => unexpectedErrorHandler(error, server));

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
