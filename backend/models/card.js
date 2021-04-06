const mongoose = require('mongoose');

// Схема owner
const ownerSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  about: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  avatar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }
})

// Схема карточки
const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /(https*:\/\/)(www\.)*(\w{1,}\W{1,}){1,}/gm.test(v);
      },
      message: 'URL введён неверно',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  //owner: ownerSchema
});

module.exports = mongoose.model('card', cardSchema);
