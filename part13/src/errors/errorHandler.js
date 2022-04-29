const BaseAPIError = require('./baseApiError');

module.exports = function (err, req, res, next) {
  console.log(err);
  if (err instanceof BaseAPIError) {
    return res.status(err.code).send({ message: err.message });
  }

  res.status(500).send({ message: 'Internal server error' });
};
