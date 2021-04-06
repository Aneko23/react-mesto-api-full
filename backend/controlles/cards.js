const Card = require('../models/card');
const BadRequestError = require('../error/bad-request-error');
const NotFoundError = require('../error/not-found-error');
const ForbiddenError = require('../error/forbidden-error');

// Получение списка всех карточек
module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send({ message: err }));
};

// Создание карточки
module.exports.createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.send( card ))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Введены некорректные данные'));
      } else {
        next(err);
      }
    });
};

// Удаление карточки
module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card.owner.equals(req.user._id)) {
        card.remove();
        return res.status(200).send({ message: 'Карточка успешно удалена' });
      } else {
        throw new ForbiddenError('Вы не можете удалить карточку другого пользователя');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Id карточки указан неверно'));
      } else {
        next(err);
      }
    });
};

// Лайк
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .then((card) => {
      if (card) {
        return res.status(200).send(card);
      }
      throw new NotFoundError('Такой карточки не существует');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Id карточки указан неверно'));
      } else {
        next(err);
      }
    });
};

// Удаление лайка
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Такой карточки не существует');
      }
      console.log(card)
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Id карточки указан неверно'));
      } else {
        next(err);
      }
    });
};
