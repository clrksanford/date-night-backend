var express = require('express');
var router = express.Router();
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


/* POST new night */
router.post('/', function(req, res, next) {
  req.body = _.pick(req.body, ['username', 'date', 'movieInfo', 'recipeInfo', 'profilePicture', 'userId']);
  var night = new Night(req.body);

  Night.save(night, function (err) {
    if (err) {
      res.status(500).send();
    } else {
      res.status(204).send();
    }
  })
});

module.exports = router;
