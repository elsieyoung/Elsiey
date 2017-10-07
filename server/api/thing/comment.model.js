'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CommentSchema = new Schema({
  ind: Number,
  comment: String,
  name: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', CommentSchema);
