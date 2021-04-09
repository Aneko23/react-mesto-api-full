const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUsers } = require('../controlles/users');
const { getProfile } = require('../controlles/users');
const { updateProfile } = require('../controlles/users');
const { updateAvatar } = require('../controlles/users');
const { getMyProfile } = require('../controlles/users');

router.get('/me', getMyProfile);
router.get('/', getUsers);
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().alphanum().length(24),
  }),
}), getProfile);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri(),
  }),
}), updateAvatar);

module.exports = router;
