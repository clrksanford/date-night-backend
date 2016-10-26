// require('dotenv').config({silent: true});
var cheerio = require('cheerio');
var axios = require('axios');
// var mongoose = require('mongoose');
// mongoose.connect(process.env.DB_CONN);
//
// var Recipe = require('./models/recipe');

// Use site navigation to sweep through and scrape

for (var i = 1; i <= 10; i++) {

  var navLink;

  if (i === 1) {
    navLink = 'http://cookieandkate.com/category/food-recipes/entrees/';
  } else {
    navLink = 'http://cookieandkate.com/category/food-recipes/entrees/page/' + i;
  }

  axios.get(navLink)
    .then(function (response) {
      var page = response.data;

      var linksArray = page.split('catlist"')[1].split('<div class="archive-pagination')[0].split('<a href="');

      linksArray.shift();

      var links = linksArray.map(function (item) {
        return item.split('"><input')[0];
      });

      links.forEach(function (link) {
        scrape(link);
      });
    });
  }

function scrape(pageLink) {

  axios.get(pageLink)
    .then(function (response) {
      var page = response.data;
      var title, recipePicture, description, categories;

      title = page.split('<h1 class="entry-title" itemprop="headline">')[1].split('</h1>')[0];

      title = "Cookie and Kate's " + title;

      description = page.split(' class="ERSSummary">')[1].split('</div>')[0];

      recipePicture = page.split('<img src="')[1].split('"')[0];

      var categoriesArray = page.split(' Categories ')[1].split('</span>')[0].split(', ');

      categories = categoriesArray.map(function (item) {
        return item.split('rel="category tag">')[1].split('</a>')[0];
      });

      if(!title) {
        console.log(false);
      } else {
        console.log(true);
      }


      // console.log(title);
      // console.log(description);
      // console.log(recipePicture);
      // console.log(categories);

    });
}

// CODE GRAVEYARD

// Extract title
// var trimmed = page.split('<h1 class="entry-title" itemprop="headline">')[1];

// var [title, rest] = trimmed.split('</h1>');

// Extract description
// [trimmed, rest] = rest.split('<div itemprop="description" class="ERSSummary">');

// var [description, rest] = rest.split('</div> <div class="ERSIngredients">');
//
// // Extract categories
// var final = rest.split('<span class="entry-categories">')[1];
// var categoriesString = final.split('</span> <span class="entry-tags">')[0];
// var categoriesArray = categoriesString.split('<a href=');
// categoriesArray.shift();
//
// var categories = categoriesArray.map(function (item) {
//   return item.split('rel="category tag">')[1].split('</a>')[0];
// });
//
// // Extract img
// var recipePicture = trimmed.split(' src="')[1].split('" alt="')[0];
//
// console.log('title', title);
// console.log('description', description);
// console.log('recipePicture', recipePicture);
// console.log('categories', categories);

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
