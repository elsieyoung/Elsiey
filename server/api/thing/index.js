'use strict';

var express = require('express');
var controller = require('./thing.controller');

var router = express.Router();

router.get('/:id', controller.getArticle);
router.get('/count', controller.getCount);

module.exports = router;

