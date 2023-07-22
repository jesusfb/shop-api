// Imports
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
// Database connection
const mongoose = require('mongoose');
mongoose
  .connect(
    process.env.MONGODB_TUTORIAL || 'mongodb+srv://jesusfb:Dove3229-@cluster0.yx9sjqo.mongodb.net/tutorial',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(
    () => {
      console.log('mongodb connect successfully');
    },
    (err) => {
      console.log(err);
    }
  );

// Setup an express app
const app = express();
app.use(cors());

// router
const index = require('./routes/index');
const api = require('./routes/api/index');

// Configure middlewares
app.use(logger('dev'));
app.use('/', index);
app.use('/v1', api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // render the error page
  const message =
    req.app.get('env') === 'development' ? err.message : 'Something went wrong';
  res.status(500).json({ message });
});

app.listen(8080, function () {
  console.log('Server has started on port 8080');
});
