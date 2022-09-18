const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 50,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    maxLength: 50,
    trim: true,

  },
  phone: {
    type: String,
    required: true,
    unique: true,
    maxLength: 20,
    trim: true,
  },
});

ClientSchema.plugin(uniqueValidator, { message: '"{PATH}" must be unique.' });

module.exports = mongoose.model('Client', ClientSchema);