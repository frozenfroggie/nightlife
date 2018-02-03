const express = require('express');
const app = express();
const morgan = require('morgan');
require('isomorphic-fetch');
require('dotenv').load();

app.use(morgan('dev'));
app.use('/', express.static('./dist'));
app.get('/', (req, res) => {
 res.sendFile(process.cwd() + '/dist/index.html');
});

app.get('/search/:city', function(req,res) {
  const options = {'headers': {'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN}};
  fetch('https://api.yelp.com/v3/businesses/search?limit=50&term=bars&location=' + req.params.city, options)
    .then( res => res.json() )
    .then( json => res.status(200).json(json) );
});

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
