const mongoose = require('mongoose');

const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: { type: String, required: true },
  urlImage: { type: String, required: true },
});

CategorySchema.virtual('url').get(function () {
  return `/api/category/${this._id}`;
});

// Export model
module.exports = mongoose.model('Category', CategorySchema);
