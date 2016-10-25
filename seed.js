// require('dotenv').config({silent: true});
var cheerio = require('cheerio');
var axios = require('axios');
// var mongoose = require('mongoose');
// mongoose.connect(process.env.DB_CONN);
//
// var Recipe = require('./models/recipe');

var links = ['http://cookieandkate.com/2016/mediterranean-spaghetti-squash-recipe/', 'http://cookieandkate.com/2016/pesto-pasta-salad-recipe/', 'http://cookieandkate.com/2016/vegan-spaghetti-alla-puttanesca/'];

var link = links[2];

axios.get('http://cookieandkate.com/2016/mediterranean-spaghetti-squash-recipe/')
  .then(function (response) {

    var page = response.data;
    var title, recipePicture, description, categories;

    // Extract title
    var trimmed = page.split('<h1 class="entry-title" itemprop="headline">')[1];

    var [title, rest] = trimmed.split('</h1>');

    // Extract description
    [trimmed, rest] = rest.split('<div itemprop="description" class="ERSSummary">');

    var [description, rest] = rest.split('</div> <div class="ERSIngredients">');

    // Extract categories
    var final = rest.split('<span class="entry-categories">')[1];
    var categoriesString = final.split('</span> <span class="entry-tags">')[0];
    var categoriesArray = categoriesString.split('<a href=');
    categoriesArray.shift();

    var categories = categoriesArray.map(function (item) {
      return item.split('rel="category tag">')[1].split('</a>')[0];
    });

    // Extract img
    var recipePicture = trimmed.split(' src="')[1].split('" alt="')[0];

    console.log('title', title);
    console.log('description', description);
    console.log('recipePicture', recipePicture);
    console.log('categories', categories);

    // var [header, rest] = page.split('<h1 class="entry-title" itemprop="headline">');
    // var [title, rest] = rest.split('</h1>');
    //
    // console.log(rest);
    // // var [filler, imageRest] = rest.split('<img src="');
    // var [filler, rest] = imageRest.split('<div class="ERSIngredientsHeader ERSHeading">');
    // var ingredients = rest.split('<div class="ERSInstructions">')[0];
    // var [recipePicture, rest] = imageRest.split('" alt="');
    // var description = rest.split(' cookieandkate.com" ')[0];

    // console.log(title);
    // console.log(ingredients);
    // console.log(recipePicture);
    // console.log(description);
  });
