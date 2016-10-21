var mongoose = require('mongoose');

var nightSchema = mongoose.Schema ({
  username: String,
  date: String,
  movieInfo: String,
  recipeInfo: String,
  profilePicture: String,
  userId: String
});

var Night = mongoose.model('Night', nightSchema);

module.exports = Night;
