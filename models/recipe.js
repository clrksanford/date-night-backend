var mongoose = require('mongoose');

var recipeSchema = mongoose.Schema ({
  title: String,
  ingredients: Array,
  description: String,
  recipePicture: String
});

var Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
