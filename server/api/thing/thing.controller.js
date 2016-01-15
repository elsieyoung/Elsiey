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
var Parse = require('parse/node').Parse;
var async = require('async');
Parse.initialize(config.PARSE_APPID, config.PARSE_JSKEY);

exports.getCount = function (req, res) {
  var Article = Parse.Object.extend('Articles');
  var artQuery = new Parse.Query(Article);
  artQuery.count({
    success: function(num) {
      console.log("!!!!!!!!!!!!!!!!!!!!!" + num);
      res.json(num);
    },
    error: function (error) {
      console.log("?????");
      res.status(500).end();
    }
  });};

exports.getArticle = function (req, res) {
  var Article = Parse.Object.extend('Articles');
  var artQuery = new Parse.Query(Article);
  artQuery.equalTo('ind', parseInt(req.params.id));
  artQuery.find({
    success: function(arts) {
      res.json(arts);
    },
    error: function (error) {
      res.status(500).end();
    }
  });};

exports.saveComments = function (req, res){
  var name = req.body.name;
  var comment = req.body.comment;
  var ind = req.body.id;

  var Comments = Parse.Object.extend('Comments');
  var newComment = new Comments();
  newComment.set('name', name);
  newComment.set('comment', comment);
  newComment.set('ind', ind);

  newComment.save(null, {
    success: function (comment) {
      res.status(200).end();
    },
    error: function (comment, error) {
      res.status(500).end();
    }
  });
};

exports.getComment = function(req, res) {
  var Comments = Parse.Object.extend('Comments');
  var commentsQuery = new Parse.Query(Comments);
  commentsQuery.equalTo('ind', parseInt(req.params.id));

  commentsQuery.find({
    success: function(comments) {
      res.json(comments);
    },
  }, function(err){
    res.status(500).end();
  });

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
