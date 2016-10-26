var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Night = require('../models/night');
var _ = require('lodash');


/* GET all nights. */
router.get('/', function(req, res, next) {
  Night.find({}, function (error, nights) {
    res.json(nights);
  });
});

/* GET current users nights */
router.get('/:userId', function(req, res, next) {
  Night.find({userId: req.params.userId}, function (error, nights) {
    res.json(nights);
  });
});

/* DELETE night. */
router.delete('/:Id', function (req, res, next) {
 Night.findById(req.params.Id, function (err, night) {
   if(err) {
     res.status(500).send();
   } else if (!night) {
     res.status(404).send();
   } else {
     night.remove(function (err) {
       if (err) {
         res.status(500).send()
       } else {
         res.status(204).send()
       }
     });
   }
 });
});

/* POST new night */
router.post('/', function(req, res, next) {
  req.body = _.pick(req.body, ['username', 'date', 'moviePicture', 'recipePicture', 'profilePicture', 'userId','nightName','nightDescription','recipeURL']);
  var night = new Night(req.body);

  night.save(night, function (err) {
    if (err) {
      res.status(500).send();
    } else {
      res.status(204).send();
    }
  });
});

module.exports = router;
