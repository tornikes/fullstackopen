const BaseAPIError = require('./baseApiError');
const { StatusCodes } = require('http-status-codes');

class NotFoundError extends BaseAPIError {
  constructor(message = 'Resource not found') {
    super(StatusCodes.NOT_FOUND, message);
  }
}

module.exports = NotFoundError;
