'use strict';

var express = require('express');
var controller = require('./thing.controller');

var router = express.Router();

router.post('/', controller.saveComments);
router.get('/:id', controller.getArticle);
router.get('/count', controller.getCount);
router.get('/comment/:id', controller.getComment);

module.exports = router;

