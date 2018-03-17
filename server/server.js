require('./config/config');

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet')
require('isomorphic-fetch');

const searchRoutes = require('./routes/search');
const usersRoutes = require('./routes/users');

const app = express();
app.use(helmet());

console.log('MongoDB URI:', process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI);

app.use(bodyParser.json())
app.use(morgan('dev'));

app.use('/', express.static('./dist'));
app.get('/', (req, res) => {
 res.sendFile(__dirname + '/dist/index.html');
});

app.use('/search', searchRoutes);
app.use('/users', usersRoutes);

app.use( (req,res,next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use( (error,req,res,next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port);

module.exports = app;
