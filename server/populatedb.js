console.log(
  'This script populates some items and categories to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
const async = require('async');
const mongoose = require('mongoose');
const Item = require('./models/item');
const Category = require('./models/category');

const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const items = [];
const categories = [];

function categoryCreate(name, urlImage, cb) {
  const categorydetail = { name, urlImage };

  const category = new Category(categorydetail);

  category.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`New Genre: ${category}`);
    categories.push(category);
    cb(null, category);
  });
}

function itemCreate(name, description, category, stock, price, urlImage, cb) {
  const itemdetail = {
    name,
    description,
    category,
    stock,
    price,
    urlImage,
  };

  const item = new Item(itemdetail);

  item.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`New Item: ${item}`);
    items.push(item);
    cb(null, item);
  });
}

function createCategories(cb) {
  async.parallel(
    [
      function (callback) {
        categoryCreate(
          'Graphics Cards',
          'https://pixabay.com/images/id-2810919/',
          callback
        );
      },
      function (callback) {
        categoryCreate(
          'Processors',
          'https://pixabay.com/images/id-424812/',
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function createItems(cb) {
  async.parallel(
    [
      function (callback) {
        itemCreate(
          'EVGA RTX 2080',
          '12 GB GDDR6',
          categories[0],
          12,
          1427,
          'https://pixabay.com/images/id-5268574/',
          callback
        );
      },
      function (callback) {
        itemCreate(
          'GIGABYTE RX 5500 XT',
          '4 GB GDDR6',
          categories[0],
          12,
          446,
          'https://pixabay.com/images/id-1371358/',
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createCategories, createItems],
  // Optional callback
  (err, results) => {
    if (err) {
      console.log(`FINAL ERR: ${err}`);
    } else {
      console.log(results);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
