const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../error/unauthorized-error');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  const payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    if (err.name === 'UnauthorizedError') {
      next(new UnauthorizedError('Id пользователя введён неверно'));
    } else {
      next(err);
    }
  }

  req.user = payload;
  next();
};
