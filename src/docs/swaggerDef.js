const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Node-AWS API documentation',
    version,
  },
  servers: [
    {
      url: 'https://nodeaws.basetrends.in/v1',
    },
    {
      url: `http://localhost:${config.port}/v1`,
    },
  ],
};

module.exports = swaggerDef;
