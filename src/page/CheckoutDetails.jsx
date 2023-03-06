import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../store/slice/cartSlice";
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Container } from "@mui/system";
import { Toolbar } from "@mui/material";

const CheckoutDetails = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  return (
    <Container>
      <Toolbar/>
      <Stack sx={{ mt: 3 }}>
        <Typography variant="h3">Checkout Summary</Typography>
        {cartItems.length === 0 ? (
          <Stack sx={{ mt: 2 }}>
            <Typography variant="body1">No item in your cart.</Typography>
            <Button variant="contained" component={Link} to="/#products">
              Back To Shop
            </Button>
          </Stack>
        ) : (
          <Stack sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>{`Cart item(s): ${cartTotalQuantity}`}</Typography>
            <Stack sx={{ mt: 2 }}>
              <Typography variant="h4">Subtotal:</Typography>
              <Typography variant="h3">{cartTotalAmount.toFixed(2)}</Typography>
            </Stack>
            {cartItems.map((item, index) => {
              const { id, name, price, cartQuantity } = item;
              return (
                <Card key={id} sx={{ mt: 2 }}>
                  <Stack sx={{ p: 2 }}>
                    <Typography variant="h4">Product: {name}</Typography>
                    <Typography variant="body1">Quantity: {cartQuantity}</Typography>
                    <Typography variant="body1">Unit price: {price}</Typography>
                    <Typography variant="body1">Set price: {price * cartQuantity}</Typography>
                  </Stack>
                </Card>
              );
            })}
          </Stack>
        )}
      </Stack>
    </Container>
  );
};

export default CheckoutDetails;
