
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  DECREASE_CART,
  selectCartItems,
} from "../../store/slice/cartSlice";
import useFetchDocument from "../../customHooks/useFetchDocument";
import useFetchCollection from "../../customHooks/useFetchCollection";
 
import StarsRating from "react-star-rate";
import { Button, Card, CardContent, CardHeader, Container, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { document } = useFetchDocument("products", id);
  const { data } = useFetchCollection("reviews");
  const filteredReviews = data.filter((review) => review.productID === id);

  const cart = cartItems.find((cart) => cart.id === id);
  const isCartAdded = cartItems.findIndex((cart) => {
    return cart.id === id;
  });

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  return (
    <Container  sx={{pt:2}}>
      <Toolbar/>
      <Card >
        
        {product === null ? (
          <CardContent sx = {{display: 'flex'}}>
            
          <Box>
            {filteredReviews.length === 0 ? (
              <p>There are no reviews for this product yet.</p>
            ) : (
              <>
                {filteredReviews.map((item, index) => {
                  const { rate, review, reviewDate, userName } = item;
                  return (
                    <Box key={index}>
                      <StarsRating value={rate} />
                      <Typography>{review}</Typography>
                      <Typography variant="span">
                        <b>{reviewDate}</b>
                      </Typography>
                      <br />
                      <Typography variant="span">
                        <b>by: {userName}</b>
                      </Typography>
                    </Box>
                  );
                })}
              </>
            )}
          </Box>
          <Typography>Product Reviews</Typography>
        </CardContent>
        ) : (
          <>
            <CardContent sx = {{display: 'flex'}}>
              <div >
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div >
              <Typography variant="h4">Product Details</Typography>
                <h3>{product.name}</h3>
                <p >{`$${product.price}`}</p>
                <p>{product.desc}</p>
                <p>
                  <b>SKU</b> {product.id}
                </p>
                <p>
                  <b>Brand</b> {product.brand}
                </p>

                <div>
                  {isCartAdded < 0 ? null : (
                    <Box sx={{display:'flex'}}>
                      <Button
                        className="--btn"
                        onClick={() => decreaseCart(product)}
                      >
                        -
                      </Button>
                      <p>
                        <b>{cart.cartQuantity}</b>
                      </p>
                      <Button
                        className="--btn"
                        onClick={() => addToCart(product)}
                      >
                        +
                      </Button>
                    </Box>
                  )}
                </div>
                <Button
                  onClick={() => addToCart(product)}
                >
                  ADD TO CART
                </Button>
              </div>
            </CardContent>
          </>
        )}
    


      
      </Card>
    </Container>
  );
};

export default ProductDetails;


 