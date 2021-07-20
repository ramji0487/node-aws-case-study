const { Record } = require('../models');

/**
 * Query for records
 * @param {Object} filter - Mongo filter
 * @param {string} [filter.startDate] - String Date in a YYYY-MM-DD format.
 * @param {string} [filter.endDate] - String Date in a YYYY-MM-DD format.
 * @param {number} [filter.minCount] - minCount for totalCount
 * @param {number} [filter.maxCount] - maxCount for totalCount
 * @returns {Promise<Array>}
 */
const queryRecords = async (filter) => {
  const matches = [];
  const aggregationQuery = [
    {
      $project: {
        key: 1,
        createdAt: 1,
        totalCount: { $sum: '$counts' },
      },
    },
  ];

  if (filter.startDate) matches.push({ createdAt: { $gt: new Date(filter.startDate) } });
  if (filter.endDate) matches.push({ createdAt: { $lt: new Date(filter.endDate) } });
  if (filter.minCount !== undefined) matches.push({ totalCount: { $gt: filter.minCount } });
  if (filter.maxCount !== undefined) matches.push({ totalCount: { $lt: filter.maxCount } });
  if (matches.length !== 0) {
    aggregationQuery.push({
      $match: {
        $and: matches,
      },
    });
  }

  const records = await Record.aggregate(aggregationQuery);
  return records;
};

module.exports = {
  queryRecords,
};
