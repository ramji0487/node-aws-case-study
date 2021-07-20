const Joi = require('joi');

const getRecords = {
  body: Joi.object().keys({
    startDate: Joi.date().iso(),
    endDate: Joi.date().iso(),
    minCount: Joi.number().integer(),
    maxCount: Joi.number().integer(),
  }),
};

module.exports = {
  getRecords,
};
