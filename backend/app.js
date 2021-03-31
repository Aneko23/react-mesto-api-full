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

// const cors = require('cors');
/*
const options = {
  origin: [
  'http://localhost:3001',
//'https://ваш домен с документа',
//'https://your-name-of.github.io',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};
*/

// app.use('*', cors());

/*
app.use((req, res, next) => {
  res.header({
    "Access-Control-Allow-Origin" : "http://localhost:3001",
    "Access-Control-Allow-Methods" : "GET, PUT, DELETE, PATCH, POST"
  })
})
*/

const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'http://localhost:3001'
];

app.use(function(req, res, next) {
  const { origin } = req.headers; // Записываем в переменную origin соответствующий заголовок

  if (allowedCors.includes(origin)) { // Проверяем, что значение origin есть среди разрешённых доменов
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
});

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');

  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .catch((error) => console.log(error));

  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'https://http://localhost:3001');
    next();
  });

app.use(bodyParcer.json());

app.use(requestLogger);

// app.use('/', express.static('../frontend/public'));

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
