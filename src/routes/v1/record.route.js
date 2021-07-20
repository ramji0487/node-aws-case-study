const express = require('express');
const validate = require('../../middleware/validate');
const recordValidation = require('../../validations/record.validation');
const recordController = require('../../controllers/record.controller');

const router = express.Router();

router.route('/').post(validate(recordValidation.getRecords), recordController.getRecords);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Records
 *   description: Fetch record data from db
 */

/**
 * @swagger
 *
 *  /records:
 *    post:
 *      summary: Fetch records
 *      description: Fetch records with filtering on optional filters.
 *      tags: [Records]
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                startDate:
 *                  type: string
 *                  description: Filter for createdAt filed (which filter date is bigger than startDate)
 *                endDate:
 *                  type: string
 *                  description: Filter for createdAt filed (which filter date is less than endDate)
 *                minCount:
 *                  type: integer
 *                  description: Filter for totalCount filed (which filter total number of count is bigger than minCount)
 *                maxCount:
 *                  type: integer
 *                  description: Filter for totalCount filed (which filter total number of count is less than maxCount)
 *              example:
 *                startDate: "2016-01-26"
 *                endDate: "2018-02-02"
 *                minCount: 2700
 *                maxCount: 3000
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  code:
 *                    type: integer
 *                    value: 0
 *                  records:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/RecordResult'
 *                  msg:
 *                    type: string
 *                    enum: [Success, Fail]
 *                    default: Success
 *        "400":
 *          $ref: '#/components/responses/BadRequest'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 */
