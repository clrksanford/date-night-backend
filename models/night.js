var mongoose = require('mongoose');

var nightSchema = mongoose.Schema ({
  username: String,
  date: String,
  moviePicture: String,
  recipePicture: String,
  profilePicture: String,
  userId: String,
  nightName: String,
  nightDescription: String
});

var Night = mongoose.model('Night', nightSchema);

module.exports = Night;
