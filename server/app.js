require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require('compression');
const helmet = require('helmet');

const mongoose = require('mongoose');

// Routes
const catalogRouter = require('./routes/catalog');

const app = express();

// Set up mongoose connection
const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const dbname = process.env.DB_NAME;

// Set up mongoose connection
const mongoDB = `mongodb+srv://${user}:${password}@cluster0.umzdp.mongodb.net/${dbname}?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Middleware chain
app.use(cors());
app.use(helmet());
app.use(compression()); // Compress all routes
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// URL will be /
app.use('/api', catalogRouter);

// The last middleware in the chain adds handler methods for errors and HTTP 404 responses.
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// Run on port 3001 if no value is given to env variable
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

module.exports = app;
