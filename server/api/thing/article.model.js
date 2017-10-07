'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  ind: Number,
  title: String,
  blog: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Article', ArticleSchema);
