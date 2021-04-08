const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../error/not-found-error');
const BadRequestError = require('../error/bad-request-error');
const UnauthorizedError = require('../error/unauthorized-error');

// Получение списка пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send(err));
};

// Получение данных определённого пользователя по id
module.exports.getProfile = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Id пользователя введён неверно'));
      } else {
        next(err);
      }
    });
};

// Получение данных пользователя
module.exports.getMyProfile = (req, res) => {
  //req.params.id = req.user._id;
  //this.getProfile(req, res);
  User.findById(req.user._id)
  .then((user) => {
    if (!user) {
      throw new NotFoundError('Нет пользователя с таким id');
    }
    return res.status(200).send(user);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError('Id пользователя введён неверно'));
    } else {
      next(err);
    }
  });

};

// Создание нового профиля
module.exports.createProfile = (req, res, next) => {
  // eslint-disable-next-line object-curly-newline
  const { email, password, name, about, avatar } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Не передан емейл или пароль');
  }
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Введены некорректные данные пользователя'));
      } else {
        next(err);
      }
    });
};

// Обновление существующего профиля
module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { runValidators: true, new: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      return res.status(200).send( user );
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Введены некорректные данные пользователя'));
      } else {
        next(err);
      }
    });
};

// Обновление аватара
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { runValidators: true, new: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      return res.status(200).send( user );
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Введена некорректная ссылка'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' }
    );
      // вернём токен
      res.send({ token, user });
    })
    .catch((err) => {
      if (err.name === 'Error') {
        next(new UnauthorizedError('Неправильно введены email или пароль'));
      } else {
        next(err);
      }
    });
};
