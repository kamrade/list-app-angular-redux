// VENDORS
const express      = require('express');
const mongoose     = require('mongoose');
const bodyParser   = require('body-parser');
const logger       = require('morgan');
const errorHandler = require('errorhandler');
const ok           = require('okay');

const app          = express();
const dbUri        = process.env.MONGOHQ_URL || 'mongodb://localhost:27017/listApp';

// INITIALS
const dbConnection = mongoose.createConnection(dbUri);
const Schema       = mongoose.Schema;

// MODELS
const listSchema   = require('./listModel');
let List = dbConnection.model('List', listSchema, 'list');

// MIDDLEWARE
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// LIST ROUTES
app.get('/', function(req, res) {
  res.send('ok');
});

app.get('/v1/lists', function(req, res, next) {
  List.find({}, ok(next, function(lists) {
    res.send(lists);
  }));
});

app.post('/v1/lists', function(req, res, next) {
  let list = new List(req.body);
  list.validate(ok(next, function(error) {
    list.save(ok(next, function(results) {
      res.send(results);
    }));
  }));
});

app.delete('/v1/lists/:id', function(req, res, next) {
  List.findOne({ _id: req.params.id }, ok(next, function (list) {
    list.remove(ok(next, function(results) {
      res.send(results);
    }));
  }));
});

// MIDDLEWARE
app.use(errorHandler())

// SERVER
app.listen(1111, () => console.log('Server is running on localhost:1111'));
