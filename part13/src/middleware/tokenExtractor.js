const jwt = require('jsonwebtoken');

const { SECRET } = require('../util/config');
const { BadRequestError } = require('../errors');

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch {
      throw new BadRequestError('token invalid');
    }
  } else {
    throw new BadRequestError('token missing');
  }
  next();
};

module.exports = tokenExtractor;
