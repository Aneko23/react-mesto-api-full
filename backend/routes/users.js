const router = require('express').Router();
const { getUsers } = require('../controlles/users');
const { getProfile } = require('../controlles/users');
const { updateProfile } = require('../controlles/users');
const { updateAvatar } = require('../controlles/users');
const { getMyProfile } = require('../controlles/users');

router.get('/me', getMyProfile);
router.get('/', getUsers);
router.get('/:id', getProfile);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
