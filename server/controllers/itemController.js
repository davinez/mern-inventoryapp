const async = require('async');
// validation - sanitization
const { body, validationResult } = require('express-validator');
const Category = require('../models/category');
const Item = require('../models/item');

exports.itemList = (req, res, next) => {};

exports.itemDetail = function (req, res, next) {};

exports.itemCreateGet = function (req, res, next) {};

exports.itemCreatePost = function (req, res, next) {};

exports.itemDeleteGet = function (req, res, next) {};

exports.itemDeletePost = function (req, res, next) {};

exports.itemUpdateGet = function (req, res, next) {};

exports.itemUpdatePost = function (req, res, next) {};
