import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  CLEAR_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  SAVE_URL,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../store/slice/cartSlice";
 
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from "react-router-dom";
import { selectIsLoggedIn } from "../store/slice/authSlice";
import { Box, Button, Container, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Card, Typography } from '@mui/material';

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const navigate = useNavigate();

  const increaseCart = (cart) => {
    dispatch(ADD_TO_CART(cart));
  };

  const decreaseCart = (cart) => {
    dispatch(DECREASE_CART(cart));
  };

  const removeFromCart = (cart) => {
    dispatch(REMOVE_FROM_CART(cart));
  };

  const clearCart = () => {
    dispatch(CLEAR_CART());
  };

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
    dispatch(SAVE_URL(""));
  }, [cartItems, dispatch]);

  const url = window.location.href;


  const checkout = () => {
    if (isLoggedIn) {
      navigate("/checkout-details");
    } else {
      dispatch(SAVE_URL(url));
      navigate("/login");
    }
  };

  return (
    <Container>
      <Box>
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <>
            <p>Your cart is currently empty.</p>
            <br />
            <Button>
              <Link to="/#products">&larr; Continue shopping</Link>
            </Button>
          </>
        ) : (
          <>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>s/n</TableCell>
          <TableCell>Product</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Total</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {cartItems.map((cart, index) => {
          const { id, name, price, imageURL, cartQuantity } = cart;
          return (
            <TableRow key={id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ marginRight: '16px' }}>
                    <b>{name}</b>
                  </Box>
                  <Box>
                    <img src={imageURL} alt={name} style={{ width: '100px' }} />
                  </Box>
                </Box>
              </TableCell>
              <TableCell>{price}</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => decreaseCart(cart)}
                    sx={{ marginRight: '8px' }}
                  >
                    -
                  </Button>
                  <p>
                    <b>{cartQuantity}</b>
                  </p>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => increaseCart(cart)}
                    sx={{ marginLeft: '8px' }}
                  >
                    +
                    </Button>
                  </Box>
                </TableCell>
                <TableCell>{(price * cartQuantity).toFixed(2)}</TableCell>
                <TableCell>
                  <Box>
                    <DeleteIcon  size={19} color="red" onClick={() => removeFromCart(cart)} />
                  </Box>
                </TableCell>
            </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <Box sx={{py:3, display: 'flex', alignItems: 'flex-end', flexDirection:'column'}}>
              <Button  onClick={clearCart}>
                Clear Cart
              </Button>
              <div  >
                <Button>
                  <Link to="/#products">&larr; Continue shopping</Link>
                </Button>
                <br />
                <Card sx={{ maxWidth: 345, padding: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    <b>{`Cart item(s): ${cartTotalQuantity}`}</b>
                  </Typography>
                  <div sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="subtitle2">
                      Subtotal:
                    </Typography>
                    <Typography variant="h6">
                      {`$${cartTotalAmount.toFixed(2)}`}
                    </Typography>
                  </div>
                  <Typography variant="body2">
                    Tax and shipping calculated at checkout
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    sx={{ marginTop: 2 }}
                    onClick={checkout}
                  >
                    Checkout
                  </Button>
                </Card>
              </div>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};

export default Cart;
