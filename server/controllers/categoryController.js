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
  body('urlImage', 'URL required').trim().isLength({ min: 0 }),

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

exports.categoryDeleteGet = function (req, res, next) {
  async.parallel(
    {
      category(callback) {
        Category.findById(req.params.id).exec(callback);
      },
      items(callback) {
        Item.find({ category: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.category == null) {
        // No results.
        return next(err);
      }
      // Successful, so send
      res.json({ results });
    }
  );
};

exports.categoryDeletePost = function (req, res, next) {
  async.parallel(
    {
      category(callback) {
        Category.findById(req.body.id).exec(callback);
      },
      items(callback) {
        Item.find({ category: req.body.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      // Success
      if (results.items.length > 0) {
        // Category still has items. Send them in same way as for GET route.
        res.status(400).send({
          error: true,
          message: 'Category has items, delete them first',
        });
      } else {
        // Category has no items. Delete object and redirect to the list of categories.
        Category.findByIdAndRemove(req.body.id, (err) => {
          if (err) {
            return next(err);
          }
          // Success - go to author list
          res.status(200).send({
            message: 'Category deleted',
          });
        });
      }
    }
  );
};

exports.categoryUpdateGet = function (req, res, next) {
  // use of "-" to exclude field
  Category.findById(req.params.id)
    .select('-__v')
    .select('-_id')
    .exec((err, category) => {
      if (err) {
        return next(err);
      }
      // Category not found
      if (category == null) {
        const errCategoryNotFound = new Error('Category not found');
        errCategoryNotFound.status = 404;
        return next(errCategoryNotFound);
      }
      // Successful, so send
      res.json({ category });
    });
};

exports.categoryUpdatePost = [
  body('name', 'Category name required').trim().isLength({ min: 3 }).escape(),
  body('urlImage', 'URL required').trim().isLength({ min: 0 }),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).send({ error: true, message: 'Check form values' });
    } else {
      // Data from form is valid.

      const category = {
        name: req.body.name,
        urlImage: req.body.urlImage,
      };

      Category.findByIdAndUpdate(
        req.params.id,
        category,
        {},
        (err, categoryUpdated) => {
          if (err) {
            return next(err);
          }
          // Successful - redirect to category detail page.
          res.status(200).send({
            id: categoryUpdated._id,
          });
        }
      );
    }
  },
];
