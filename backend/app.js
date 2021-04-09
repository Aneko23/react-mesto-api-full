require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParcer = require('body-parser');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { createProfile, login } = require('./controlles/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./error/not-found-error');

const app = express();
const { PORT = 3000 } = process.env;

app.use(cors());

app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .catch((error) => console.log(error));

app.use(bodyParcer.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    avatar: Joi.string().uri(),
  }),
}), createProfile);

app.use('/users', auth, usersRouter);

app.use('/cards', auth, cardsRouter);

// Если ввели несуществующий адрес
app.use((req, res) => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errorLogger);

// Обработчик ошибок валидации
app.use(errors());

// Централизованный обработчик ошибок
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({ message: `${err.message}` } || 'Ошибка на сервере');
  next();
});

app.listen(PORT, () => {
  console.log(`Сервер работает на порте ${PORT}`);
});
