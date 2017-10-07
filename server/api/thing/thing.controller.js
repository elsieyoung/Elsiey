/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var config = require('../../config/environment');
var Article = require('./article.model');
var Comment = require('./comment.model');
//var Parse = require('parse/node').Parse;
var async = require('async');
//Parse.initialize("h4fBz9LKOYSpyMkjDtSF6Pkf21QYiPUaWFbSg84l", "EXe1NsztkCdTdc9jn8GhRiFRBp4SkHOysFHVMDcm");

exports.getCount = function (req, res) {
  Article.count({}, function (err, count) {
    if (err) return res.status(500).send(err);
    console.log("Number of articles: ", count);
    res.status(200).json(count);
  });

  //var Article = Parse.Object.extend('Articles');
  //var artQuery = new Parse.Query(Article);
  //artQuery.count({
  //  success: function(num) {
  //    res.status(200).json(num);
  //  },
  //  error: function (error) {
  //    res.status(500).end();
  //  }
  //});};
};

exports.getArticle = function (req, res) {
  Article.find({'title': "Hello World"}, function(err, article) {
    if (err) return res.status(500).send(err);
    res.status(200).json(article);
  });

  //var Article = Parse.Object.extend('Articles');
  //var artQuery = new Parse.Query(Article);
  //artQuery.equalTo('ind', parseInt(req.params.id));
  //artQuery.find({
  //  success: function(arts) {
  //    res.json(arts);
  //  },
  //  error: function (error) {
  //    res.status(500).end();
  //  }
  //});
};

exports.saveComments = function (req, res){
  var name = req.body.name;
  var comment = req.body.comment;
  var ind = req.body.id;

  var newComment = new Comment();
  newComment.name = req.body.username;
  newComment.comment = comment;
  newComment.ind = ind;

  newComment.save(function(err, user) {
    if (err) res.status(400).end();

    res.status(200).end();
  });

  //var Comments = Parse.Object.extend('Comments');
  //var newComment = new Comments();
  //newComment.set('name', name);
  //newComment.set('comment', comment);
  //newComment.set('ind', ind);
  //
  //newComment.save(null, {
  //  success: function (comment) {
  //    res.status(200).end();
  //  },
  //  error: function (comment, error) {
  //    res.status(500).end();
  //  }
  //});
};

exports.getComment = function(req, res) {
  Comment.find({'ind': parseInt(req.params.id)}, function(err, comment) {
    if (err) return res.status(500).send(err);
    res.status(200).json(comment);
  });

  //var Comments = Parse.Object.extend('Comments');
  //var commentsQuery = new Parse.Query(Comments);
  //commentsQuery.equalTo('ind', parseInt(req.params.id));
  //
  //commentsQuery.find({
  //  success: function(comments) {
  //    res.json(comments);
  //  },
  //}, function(err){
  //  res.status(500).end();
  //});

};
//exports.getAllArticle = function (req, res) {
//  var Article = Parse.Object.extend('Articles');
//  var artQuery = new Parse.Query(Article);
//  artQuery.descending('ind');
//  //artQuery.limit(10);
//  artQuery.find({
//    success: function(arts) {
//      res.json(arts);
//    },
//    error: function (error) {
//      res.status(500).end();
//    }
//  });
//};
