const express = require('express');
const recordRoute = require('./record.route');
const docsRoute = require('./docs.route');

const router = express.Router();

router.use('/records', recordRoute);
router.use('/docs', docsRoute);

module.exports = router;
