var mongoose = require('mongoose');

var recipeSchema = mongoose.Schema ({
  title: String,
  categories: Array,
  description: String,
  recipePicture: String,
  recipeURL: String
});

var Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
