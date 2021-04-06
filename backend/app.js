const express = require('express');
const mongoose = require('mongoose');
const bodyParcer = require('body-parser');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { createProfile, login } = require('./controlles/users');
const auth = require('./middlewares/auth');

const app = express();
const { PORT = 3000 } = process.env;

const cors = require('cors');

const options = {
origin: [
'http://localhost:3000/',
'http://localhost:3001/',
'http://localhost:8080'
],
methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
preflightContinue: false,
optionsSuccessStatus: 204,
allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'Access-Control-Allow-Origin'],
credentials: true,
};

app.use('*', cors(options));

//app.use(cors());

// app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .catch((error) => console.log(error));

app.use(bodyParcer.json());

app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
  }),
}), createProfile);

app.use('/users', auth, usersRouter);

app.use('/cards', auth, cardsRouter);

// Если ввели несуществующий адрес
app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.use(errorLogger);

// Обработчик ошибок валидации
app.use(errors());

// Централизованный обработчик ошибок
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});

app.listen(PORT, () => {
  console.log(`Сервер работает на порте ${PORT}`);
});
