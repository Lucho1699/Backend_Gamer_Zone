const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  developer: { type: String, required: true },
    description: { type: String, required: true },
    imageSrc: { type: String, required: true },

});

module.exports = mongoose.model('Game', gameSchema);