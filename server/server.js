require('./config/config');

const path = require('path');
const express = require('express');
// const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet')
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const fileUpload = require('express-fileupload');
                   require('isomorphic-fetch');

const searchRoutes = require('./routes/search');
const usersRoutes = require('./routes/users');
const socialAuthRoutes = require('./routes/socialAuth');
const connectRoutes = require('./routes/connect');

const auth = require('./passport/auth.js');
const githubAuth = require('./passport/strategies/githubAuth.js');
const googleAuth = require('./passport/strategies/googleAuth.js');
const facebookAuth = require('./passport/strategies/facebookAuth.js');

const publicPath = path.join(__dirname, '../dist');

const app = express();
app.use(helmet());
app.use(fileUpload());

console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI);

app.use(session({
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use(bodyParser.json())
// app.use(morgan('dev'));

app.use('/', express.static(publicPath));

auth(app);
githubAuth();
facebookAuth();
googleAuth();

app.use('/search', searchRoutes);
app.use('/users', usersRoutes);
app.use('/socialAuth', socialAuthRoutes);
//app.use('/connect', connectRoutes);

app.use( (req,res,next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use( (error,req,res,next) => {
  if(process.env.NODE_ENV === 'dev') {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  } else {
    res.sendFile(publicPath + '/error.html');
  }
});

const port = process.env.PORT || 8000;
app.listen(port);

module.exports = app;
