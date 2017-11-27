const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// OPTIONS
const titleMax = 240;

const listSchema = new Schema({
  title: {
    type: String,
    trim: true,
    max: titleMax,
    required: true
  },
  parameters: {
    order: {
      type: Number,
      required: true
    }
  }
});

module.exports = listSchema;
