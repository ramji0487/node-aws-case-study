const httpStatus = require('http-status');
const httpMocks = require('node-mocks-http');
const { errorConverter, errorHandler } = require('../../src/middleware/error');
const ApiError = require('../../src/utils/ApiError');
const config = require('../../src/config/config');
const logger = require('../../src/config/logger');

describe('Error middleware', () => {
  describe('Error converter', () => {
    it('should return the same ApiError object it was called with', () => {
      const error = new ApiError(httpStatus.BAD_REQUEST, 'Any error');
      const next = jest.fn();

      errorConverter(error, httpMocks.createRequest(), httpMocks.createResponse, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('Error handler', () => {
    beforeEach(() => {
      jest.spyOn(logger, 'error').mockImplementation(() => {});
    });

    it('should put the error stack in the response if in development mode', () => {
      config.env = 'development';
      const error = new ApiError(httpStatus.BAD_REQUEST, 'Any error');
      const res = httpMocks.createResponse();
      const sendSpy = jest.spyOn(res, 'send');

      errorHandler(error, httpMocks.createRequest(), res);

      expect(sendSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          code: error.statusCode,
          msg: error.message,
          stack: error.stack,
        }),
      );
      config.env = process.env.NODE_ENV;
    });

    it('should send internal server error status and message if in production mode and error is not operational', () => {
      config.env = 'production';
      const error = new ApiError(httpStatus.BAD_REQUEST, 'Any error', false);
      const res = httpMocks.createResponse();
      const sendSpy = jest.spyOn(res, 'send');

      errorHandler(error, httpMocks.createRequest(), res);

      expect(sendSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          code: httpStatus.INTERNAL_SERVER_ERROR,
          msg: httpStatus[httpStatus.INTERNAL_SERVER_ERROR],
        }),
      );
      config.env = process.env.NODE_ENV;
    });

    it('should preserve original error status and message if in production mode and error is operational', () => {
      config.env = 'production';
      const error = new ApiError(httpStatus.BAD_REQUEST, 'Any error');
      const res = httpMocks.createResponse();
      const sendSpy = jest.spyOn(res, 'send');

      errorHandler(error, httpMocks.createRequest(), res);

      expect(sendSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          code: error.statusCode,
          msg: error.message,
        }),
      );
      config.env = process.env.NODE_ENV;
    });
  });
});
