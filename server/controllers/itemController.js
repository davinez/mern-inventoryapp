const async = require('async');
// validation - sanitization
const { body, validationResult } = require('express-validator');
const Category = require('../models/category');
const Item = require('../models/item');

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

exports.itemCreateGet = function (req, res, next) {};

exports.itemCreatePost = function (req, res, next) {};

exports.itemDeleteGet = function (req, res, next) {};

exports.itemDeletePost = function (req, res, next) {};

exports.itemUpdateGet = function (req, res, next) {};

exports.itemUpdatePost = function (req, res, next) {};
