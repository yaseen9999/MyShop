const mongoose = require('mongoose');

const productDetailSchema = new mongoose.Schema({
  
    productid:{
        type:  mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'products',
    },
  

    colors: {
        type :String,
        required:true,
    }  ,
    items:{
        type :Number,
        required:true,
    }  ,
    
    images:{
        type :[String],
        required:true,
    } 

    
});




module.exports = mongoose.model('productdetails', productDetailSchema);
