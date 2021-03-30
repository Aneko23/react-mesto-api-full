const router = require('express').Router();
const { getCards } = require('../controlles/cards');
const { createCard } = require('../controlles/cards');
const { deleteCard } = require('../controlles/cards');
const { likeCard } = require('../controlles/cards');
const { dislikeCard } = require('../controlles/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
