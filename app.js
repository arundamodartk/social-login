const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const http = require('http');
const mongoose = require('mongoose');
const passport = require('passport');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

const os = require('os');
require('dotenv').config({
  path: os.homedir() + '/social-login.env'
});

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());


const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');

passport.use(new LocalStrategy(
    {
      usernameField: 'email'
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({email});
        if (!user) {
          return done(null, false, {error: 'No such user exist'});
        }
        if (!user.isValidPassword(password)) {
          return done(null, false, {error: 'Incorrect password'});
        }
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
));


app.use('/', indexRouter);
app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('404', {title: 'Social Login'});
});

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
const server = http.createServer(app);

console.log('Database connection initiated');
mongoose.connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => {
  server.listen(port);
  console.log('Database connection successful');
}).catch((err) => {
  console.error(err, 'Database connection error');
});

server.on('error', onError);
server.on('listening', onListening);


/**
 * to normalize
 *
 * @param {*} val
 * @return {*}
 */
function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

/**
 * error handler
 *
 * @param {*} error
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * server boot
 *
 */
function onListening() {
  const addr = server.address();
  const bind =
    typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}

module.exports = app;
