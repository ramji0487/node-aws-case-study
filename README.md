# This is node-aws case study 

project is running on:

[RESTApi Post URL as per case study](https://nodeaws.basetrends.in/v1/records)

node-aws app , a test project RESTful APIs using Node.js, Express, and Mongoose.

It comes with features, such as request validation, unit and integration tests, Error Handling, Logging, Linting, Documentation

## Features

- **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
- **NoSQL database**: [MongoDB](https://www.mongodb.com) object data modeling using [Mongoose](https://mongoosejs.com)
- **API documentation**: with [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) and [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)
- **Dependency management**: with [NPM](https://docs.npmjs.com/getting-started)
- **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io)
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- **Compression**: gzip compression with [compression](https://github.com/expressjs/compression)

## Getting Started

### Installation

#### locally

Clone the repo:

```bash
git clone https://github.com/ramji0487/node-aws-case-study.git
cd node-aws-case-study
```

Install the dependencies:

```bash
npm install
```



ensure your app is running



 you can view logs

```bash
pm2 logs --tail
```

### Commands

Running:

```bash
npm start
```

Testing:

```bash
# run all integration tests
npm run test:integration

# run all unit tests
npm run test:unit

```


## Project Structure

```bash
src\
 |--config\         # configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--docs\           # Swagger files
 |--middleware\     # Custom express middleware
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
 |--index.js        # App entry point
```

## API Documentation

To view the list of available APIs and their specifications, run the server and go to `/v1/docs` in your browser. This documentation page is automatically generated using the [swagger](https://swagger.io/) definitions written as comments in the route files.

### API Endpoints

List of available routes:

**Auth routes**:\
`POST /v1/records` - my records

## Error Handling

The app has a centralized error handling mechanism.

Controllers wrapped inside the catchAsync utility wrapper, which forwards the error.

```javascript
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');

const controller = catchAsync(async (req, res) => {
  // this error will be forwarded to the error handling middleware
  throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
});
```

The error handling middleware sends an error response, which has the following format:

```json
{
  "code": 404,
  "message": "Not found"
}
```

When running in development mode, the error response also contains the error stack.

The app has a utility ApiError class to which you can attach a response code and a message, and then throw it from anywhere (catchAsync will catch it).

## Logging

Import the logger from `src/config/logger.js`. It is using the [Winston](https://github.com/winstonjs/winston) logging library.

Logging should be done according to the following severity levels (ascending order from most important to least important):

```javascript
const logger = require('<path to src>/config/logger');

logger.error('message'); // level 0
logger.warn('message'); // level 1
logger.info('message'); // level 2
logger.http('message'); // level 3
logger.verbose('message'); // level 4
logger.debug('message'); // level 5
```

## Validation

Request data is validated using [Joi](https://joi.dev/). Check the [documentation](https://joi.dev/api/) for more details on how to write Joi validation schemas.

The validation schemas are defined in the `src/validations` directory and are used in the routes by providing them as parameters to the `validate` middleware.

```javascript
const express = require('express');
const validate = require('../../middleware/validate');
const recordValidation = require('../../validations/record.validation');
const recordController = require('../../controllers/record.controller');

const router = express.Router();

router.route('/').post(validate(recordValidation.getRecords), recordController.getRecords);
```
