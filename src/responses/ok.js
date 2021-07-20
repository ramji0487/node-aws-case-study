const constant = require('../constants');

module.exports = (data) => ({
  code: constant.SUCCESS,
  msg: 'Success',
  ...data,
});
