const async = require('async');
// validation - sanitization
const { body, validationResult } = require('express-validator');
const Category = require('../models/category');
const Item = require('../models/item');
// helpers
const helperSort = require('../utils/sort');

exports.itemList = (req, res, next) => {};

// example route/name/:id the “id” property is available as req.params.id
exports.itemDetail = function (req, res, next) {
  Item.findById(req.params.id)
    .populate('category')
    .exec((err, item) => {
      if (err) {
        return next(err);
      }
      if (item == null) {
        // No results.
        const errItemNotFound = new Error('Item not found');
        errItemNotFound.status = 404;
        return next(errItemNotFound);
      }
      // Successful, so send
      res.json({ item });
    });
};

exports.itemCreateGet = function (req, res, next) {
  // Get all categories thats exists in DB
  Category.find({}, 'name').exec((err, categories) => {
    if (err) {
      return next(err);
    }
    // Sort
    helperSort.sortCategoriesList(categories);
    // Successful, so send
    res.json({ categories });
  });
};

exports.itemCreatePost = [
  body('name', 'Category name required').trim().isLength({ min: 3 }).escape(),
  body('description', 'Description required')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('category', 'Category required').trim().isMongoId().escape(),
  body('stock', 'Stock required').isNumeric().escape(),
  body('price', 'Price required').isNumeric().escape(),
  body('urlImage', 'URL required').trim().isLength({ min: 4 }).escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      stock: req.body.stock,
      price: req.body.price,
      urlImage: req.body.urlImage,
    });

    if (!errors.isEmpty()) {
      res.status(400).send({ error: true, message: 'Check form values' });
    } else {
      // Data from form is valid.

      // Check if Item with same name already exists.
      Item.findOne({ name: req.body.name }).exec((err, foundItem) => {
        if (err) {
          return next(err);
        }

        if (foundItem) {
          // Item exists, redirect to its detail page.
          res.status(200).send({
            id: foundItem._id,
            message: 'Item already exists',
          });
        } else {
          item.save((err) => {
            if (err) {
              return next(err);
            }
            // Item saved, redirect to its detail page.
            res.status(200).send({
              id: item._id,
            });
          });
        }
      });
    }
  },
];

exports.itemDeleteGet = function (req, res, next) {};

exports.itemDeletePost = function (req, res, next) {};

exports.itemUpdateGet = function (req, res, next) {
  // use of "-" to exclude field
  Item.findById(req.params.id)
    .select('-__v')
    .select('-_id')
    .exec((err, item) => {
      if (err) {
        return next(err);
      }
      // Item not found
      if (item == null) {
        const errItemNotFound = new Error('Item not found');
        errItemNotFound.status = 404;
        return next(errItemNotFound);
      }
      // Successful, so send
      res.json({ item });
    });
};

exports.itemUpdatePost = [
  body('name', 'Category name required').trim().isLength({ min: 3 }).escape(),
  body('description', 'Description required')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('category', 'Category required').trim().isMongoId().escape(),
  body('stock', 'Stock required').isNumeric().escape(),
  body('price', 'Price required').isNumeric().escape(),
  body('urlImage', 'URL required').trim().isLength({ min: 4 }).escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).send({ error: true, message: 'Check form values' });
    } else {
      // Data from form is valid.

      const item = {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        stock: req.body.stock,
        price: req.body.price,
        urlImage: req.body.urlImage,
      };

      Item.findByIdAndUpdate(req.params.id, item, {}, (err, itemUpdated) => {
        if (err) {
          return next(err);
        }
        // Successful - redirect to category detail page.
        res.status(200).send({
          id: itemUpdated._id,
        });
      });
    }
  },
];
