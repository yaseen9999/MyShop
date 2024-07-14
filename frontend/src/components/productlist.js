import  React,{useContext,useState,useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import '../styles/products.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
export default function ProductList() {
 const[productcards,setproductcards]=useState([]);

 const uid = useSelector((state) => state.user.userid);
 const filteredproducts = useSelector((state) => state.filter.filterproducts);

 useEffect(() => {
  console.log('UserID:', uid); // This should log the current user ID
}, [uid]);
useEffect(() => {
  console.log(filteredproducts)
  if (filteredproducts.length > 0) { 
    const allProducts = filteredproducts.flatMap(item => item.products);
    console.log(allProducts);
    setproductcards(allProducts);
  }
}, [filteredproducts]);
useEffect(() => {
  console.log('component update');

  const fetchProducts = async () => {
    try {
      let url = 'http://localhost:3001/fetchproducts';
      const response = await axios.get(url);
      setproductcards(response.data);
      console.log(response.data);
      
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  fetchProducts();
}, []);

const handlecart= async (uid,id)=>{
  try {
    if (!uid) {
      console.error('UserID is null');
      return;
    }
    const response =await axios.get( `http://localhost:3001/cart/${uid}/${id}`);
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}






  return (
   
    <div class="con">
    <section class='sty'>
  
         <div className="row">
          {productcards.length>0 && (
             productcards.map(item=>(
              <div 
              key={item._id} className="col-lg-3 col-md-4 col-sm-6  mb-4 " >
                  <Card  sx={{ maxWidth: 300 }} >
        <CardActionArea>
          <CardMedia style={{height:'180px' ,objectFit: 'contain' }}
            component="img"
         
            image={item.imageUrl}
           
          />
          <CardContent  >
  
            <Typography style={{ height:"40px",overflow:'hidden'}}gutterBottom variant="h6" component="div">
              {item.name}
            </Typography>
            <Typography   variant="body2" color="text.secondary" style={{ height:"60px", overflow: 'hidden', textOverflow: 'ellipsis',wordwrap: 'breakword'}}>
            {item.description}
            </Typography>
            <Typography style={{ height:"4px"}}gutterBottom variant="h8" component="div">
              {'Price'+item.price+'$'}
            </Typography>
            
          </CardContent>
        </CardActionArea>
        <CardActions>
        <Link to={`/detailpage/${item._id}`}>
        <Button  size="small" color="primary">
            View Details
          </Button>
        </Link>
  
         
          <Button  size="small" color="primary" >
          <FaShoppingCart size={24} color="purple" onClick={()=>handlecart(uid,item._id)} />
          </Button>
         
         
        </CardActions>
      </Card>
  
  
  
      </div>
      ))
          )

          }
        
     </div>
    </section> 



    </div>
    
        
             

 
  
    
          
       
  );
}
