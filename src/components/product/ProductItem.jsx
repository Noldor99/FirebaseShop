import { Button, Card, CardContent, CardMedia, Grid } from '@mui/material'
import { Box } from '@mui/system';
import React from 'react'
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { ADD_TO_CART,
         CALCULATE_SUBTOTAL,
         CALCULATE_TOTAL_QUANTITY
        } from '../../store/slice/cartSlice';

const ProductItem = ({item, isGridView}) => {


  const dispatch = useDispatch();
  const navigate = useNavigate()


  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
    dispatch(CALCULATE_SUBTOTAL());
  };

  return (
    <Grid item
      xs={isGridView ? 12 : 12} sm={6} md={isGridView ? 4 : 12}
      key={item.id}>
      <Card sx={isGridView ?  {display:'flex', 
                justifyContent: 'space-between', 
                flexDirection: 'column',
                height: '100%'}
               : {display: 'flex'}} >
        
        <CardMedia
          sx={!isGridView && { width: 'inherit' }}
          component="img" height="140" image={item.imageURL} alt={item.title} />
        <CardContent
          sx={{}}
        >
          <h2>{item.name}</h2>
          <p style={{ maxHeight: '50px', overflow: 'hidden' }}>{item.desc}</p>
          <Box sx={{display:'flex', justifyContent:'space-between'}}>
            <Button
              onClick={() => addToCart(item)}
            >
              Add To Cart
            </Button>
            <Button
              onClick={() => navigate(`/product-details/${item.id}`)}
              
            >
              Info
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default ProductItem
