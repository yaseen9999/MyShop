const mongoose = require ('mongoose')
const Schema = mongoose.Schema;
const cartSchema= new mongoose.Schema({
cart:[{
userId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
},
items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
      
        required: true,
      },
}]
}]
})
const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;