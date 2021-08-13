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

exports.categoryDetail = function (req, res, next) {};

exports.categoryCreatePost = function (req, res, next) {};

exports.categoryDeleteGet = function (req, res, next) {};

exports.categoryDeletePost = function (req, res, next) {};

exports.categoryUpdateGet = function (req, res, next) {};

exports.categoryUpdatePost = function (req, res, next) {};
