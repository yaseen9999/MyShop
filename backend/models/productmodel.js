const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  products:[
    {
      name: {
        type: String,
        required: true
    },
    category: {
      type: String,
      required: true
  },
  type: {
    type: String,
    required: true
},
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
      type: String,
      required: true
  },
    }]},{ timestamps: true });
  
module.exports = mongoose.model('products', productSchema);
