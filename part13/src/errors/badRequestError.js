const BaseAPIError = require('./baseApiError');
const { StatusCodes } = require('http-status-codes');

class BadRequestError extends BaseAPIError {
  constructor(message = 'Bad Request') {
    super(StatusCodes.BAD_REQUEST, message);
  }
}

module.exports = BadRequestError;
