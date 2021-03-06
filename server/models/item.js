const mongoose = require('mongoose');

const { Schema } = mongoose;

const ItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  stock: { type: Number, required: true },
  price: { type: Number, required: true },
  urlImage: { type: String },
});

ItemSchema.virtual('url').get(function () {
  return `/api/item/${this._id}`;
});

// Export model
module.exports = mongoose.model('Item', ItemSchema);
