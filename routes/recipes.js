var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Recipe = require('../models/recipe');
var _ = require('lodash');


/* GET all recipes. */
router.get('/:keyword', function(req, res, next) {
  Recipe.find({categories: req.params.keyword}, function (error, recipes) {
    res.json(recipes);
  });
});

module.exports = router;
