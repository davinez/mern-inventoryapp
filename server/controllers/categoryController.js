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

exports.categoryCreatePost = [
  body('name', 'Category name required').trim().isLength({ min: 3 }).escape(),
  body('urlImage', 'URL required').trim().isLength({ min: 4 }).escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.name,
      urlImage: req.body.urlImage,
    });

    if (!errors.isEmpty()) {
      res.status(400).send({ error: true, message: 'Check form values' });
    } else {
      // Data from form is valid.

      // Check if Category with same name already exists.
      Category.findOne({ name: req.body.name }).exec((err, found_category) => {
        if (err) {
          return next(err);
        }

        if (found_category) {
          // Category exists, redirect to its detail page.
          res.status(200).send({
            id: found_category._id,
            message: 'Category already exists',
          });
        } else {
          category.save((err) => {
            if (err) {
              return next(err);
            }
            // Category saved, redirect to its detail page.
            res.status(200).send({
              id: category._id,
            });
          });
        }
      });
    }
  },
];

exports.categoryDeleteGet = function (req, res, next) {};

exports.categoryDeletePost = function (req, res, next) {};

exports.categoryUpdateGet = function (req, res, next) {};

exports.categoryUpdatePost = function (req, res, next) {};
