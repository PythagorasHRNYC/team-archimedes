///////////////////////////////////////////////////////////////////
//
// This file sets up the express routes for our app.
//
///////////////////////////////////////////////////////////////////

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request')
const app = express();
const axios = require('axios');
const db = require('../database/index.js');
const sentiment = require('sentiment');
const cron = require('node-cron');
const pgDB = require('../database/real-database/config.js').db;
const knex = require('../database/real-database/config.js').knex;
const User = require('../database/real-database/models/user.js')
const Favorite = require('../database/real-database/models/favorite.js')

// helper functions - see helper.js
var getTweets = require('./helper.js').getTweets; 
var cronJob = require('./helper.js').cronJob;
var getUserProfileData = require('./helper.js').getUserProfileData;


cron.schedule('*/30 * * * *', () => {
  // call helper function every half-hour
  cronJob();
});

const sanitizeHTML = require('sanitize-html')
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())

app.post('/search', function(req, res) {

  const searchTerm = sanitizeHTML(req.body.searchTerm) || 'undefined';
  searchTerm.split(`'`).join('').split('#').join('').split('"').join('').split('/').join('').split('`').join('')

  db.addToSearchTerms({searchTerm: searchTerm});

  getTweets(searchTerm, (data) => {
    res.send(data)
  });

})

app.get('/testUserProfileData', (req, res) => {
  getUserProfileData('youtube', (data) => {
    console.log('in')
    res.send(data)
  })  
})

app.post('/database', function(req, res) {
  const average = req.body.average;
  const searchTerm = req.body.searchTerm;
  if ( average !== null ) {
    db.save({
      searchTerm: searchTerm,
      averageScore: average,
      searchHour: Date.now()
    });
  }
  res.end()
})

app.get('/previousSearches', (req, res) => {
  //shouldn't need to do .searchTerm beacuse already doing the hing
  db.getAllData((data) => {
    res.send(data); //array of objects
  })
})


app.get('/database', (req, res) => {
  // query the database for the search term and return all matches.
  db.find(req.query.searchTerm, (results) => {
    res.send(results);
  });
});

app.post('/login', (req, res) => {
  const { username, email } = req.body;
  const newUser = new User({ email })
  newUser
  .fetch()
  .then(user => {
    if(!user) {
      newUser = new User({ username, email })
      newUser
      .fetch()
      .save()
      .then(info => {
        console.log('info', info)
        res.status(200).send(info);
      })
    } else {
      res.status(200).send(user);
    }
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

<<<<<<< HEAD
app.post('/favorite', (req, res) => {

=======
app.post('/favorites', (req, res) => {
  const { favorite, userId } = req.body;
  const newFav = new Favorite({ userId, favorite })
  newFav
  .fetch()
  .then(fav => {
    if(fav) {
      res.status(200).send(fav)
    } else {
      newFav
      .save()
      .then(fav => {
        res.status(200).send(fav)    
      })
    }
  })
})

app.get('/favorites', (req, res) => {
  knex.select('favorite').from('favorites')
  .where('userId', req.headers.userid)
  .then(result => {
    res.status(200).send(result)
  })
>>>>>>> favFeat
})

app.listen(process.env.PORT || 3000, function() {
  console.log('listening on port 3000!');
});
