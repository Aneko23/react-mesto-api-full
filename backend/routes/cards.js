const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getCards } = require('../controlles/cards');
const { createCard } = require('../controlles/cards');
const { deleteCard } = require('../controlles/cards');
const { likeCard } = require('../controlles/cards');
const { dislikeCard } = require('../controlles/cards');

router.get('/', getCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
  }),
}), createCard);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().alphanum().length(24),
  }),
}), deleteCard);

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().alphanum().length(24),
  }),
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().alphanum().length(24),
  }),
}), dislikeCard);

module.exports = router;
