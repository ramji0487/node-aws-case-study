const pick = require('../utils/pick');
const ok = require('../responses/ok');
const catchAsync = require('../utils/catchAsync');
const { recordService } = require('../services');

const getRecords = catchAsync(async (req, res) => {
  const filter = pick(req.body, ['startDate', 'endDate', 'minCount', 'maxCount']);
  const result = await recordService.queryRecords(filter);
  res.send(ok({ records: [...result] }));
});

module.exports = {
  getRecords,
};
