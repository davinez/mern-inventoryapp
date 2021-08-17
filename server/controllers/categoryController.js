const async = require('async');
// validation - sanitization
const { body, validationResult } = require('express-validator');
const Category = require('../models/category');
const Item = require('../models/item');

exports.categoryList = (req, res, next) => {
  Category.find()
    .sort([['name', 'ascending']])
    .exec((err, categories) => {
      if (err) {
        return next();
      }
      // Successful, so send
      res.json({ categories });
    });
};

exports.categoryDetail = function (req, res, next) {
  async.parallel(
    {
      category(callback) {
        Category.findById(req.params.id).exec(callback);
      },

      categoryItems(callback) {
        Item.find({ category: req.params.id })
          .select('_id name stock')
          .exec(callback);
      },
    },
    (err, results) => {
      console.log(results);
      if (err) {
        return next(err);
      }
      if (results.category == null) {
        // No results.
        const errNotFound = new Error('Category not found');
        errNotFound.status = 404;
        return next(errNotFound);
      }
      // Successful, so send
      res.json({ results });
    }
  );
};

exports.categoryCreatePost = function (req, res, next) {};

exports.categoryDeleteGet = function (req, res, next) {};

exports.categoryDeletePost = function (req, res, next) {};

exports.categoryUpdateGet = function (req, res, next) {};

exports.categoryUpdatePost = function (req, res, next) {};
