const express = require('express');
const mongoose = require('mongoose'); 
const cors = require('cors');
const usersdata=require('./models/usermodel')
const bodyParser = require('body-parser');
const MONGODB_URI = 'mongodb://localhost:27017/ecommerce';
const bcyrpt =require('bcrypt');
const crypto=require ('crypto');
const jwt =require('jsonwebtoken');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const category=require('./controllers/category');

const detailpage=require('./controllers/detailpage');
const addproduct=require('./controllers/addproduct');
const productdetails =require('./controllers/productdetails');
const fetchproducts=require('./controllers/fetchproducts');
const cart=require('./controllers/cart');
const fetchcart=require('./controllers/fetchcart');
const app = express();

const secret='abcdef123456abcd123';
 // You can change this based on your requirementsts
 

const PORT = process.env.PORT|| 3001 ;

app.use(cors());
app.use(bodyParser.json());

          


mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

  const verifyToken = (req, res, next) => {
    // Get token from request headers
    const token = req.headers.authorization;
    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    // Check if token is present
   
  
    // Verify token
    jwt.verify(token.split(' ')[1],secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      // If token is valid, save decoded user information to request object
      
      next(); // Proceed to the next middleware
    });
  };
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Define the destination directory for uploaded files
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      // Define the file name for uploaded files
      cb(null, file.originalname + '-' + Date.now() );
    }
  });
  
  // Initialize multer with the storage engine
  const upload = multer({ storage: storage
    
   });
  app.post('/admin',upload.single('image'), addproduct.createProducts );
  app.post('/admin/adddetail',upload.array('images',5), productdetails.createProductdetails );
  app.get('/fetchproducts', fetchproducts.getAllProducts );
  app.get('/filterproducts', category.getfilterproducts );
  
  
  app.get('/details/:id',detailpage.fetchdetails);
  app.get('/cart/:uid/:id',cart.getcartproducts);
  app.get('/items/:id',fetchcart.getcartitems);
  app.post('/home',verifyToken, (req, res) => {
    console.log('welcome protected');
  });
app.post('/signin',async(req, res) => {
const {email,password }=req.body;
console.log('request receive ',email,password)
try{
const user= await usersdata.findOne({email})
if (!user) {
  return res.status(400).json({ message: 'User not found' });
}

const ispasscorrect= await bcyrpt.compare(password,user.pass)
if(ispasscorrect){
  console.log('passcorrect')
}
if(!ispasscorrect){
  console.log('passincorrect')
}


if(user||ispasscorrect){
 // const secret = crypto.randomBytes(32).toString('hex');

  const token = await jwt.sign({user} , secret);

  res.status(201).json({ token ,userId: user._id});
}

}catch(err){
  console.error(err);
}
 
   
  

});
app.post('/signup', async (req, res) => {
  const { name, lastName,email,pass} = req.body;
console.log( name, lastName,email,pass,'request recieved');
try {
  
  const hashpass=await bcyrpt.hash(pass,10);
  const newUser = new usersdata({name,lastName,email,pass:hashpass});
  await newUser.save();
  res.json(newUser);

} catch (err) {
 console.log(err);
}
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
