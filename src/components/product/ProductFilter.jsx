import { Box, Button, Input, MenuItem, Select, Slider, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
} from "../../store/slice/filterSlice";
import {
  selectMaxPrice,
  selectMinPrice,
  selectProducts,
} from "../../store/slice/productSlice";

const ProductFilter = () => {
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState(3000);
  const products = useSelector(selectProducts);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);
  const dispatch = useDispatch();

  const allCategories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];
  const allBrands = [
    "All",
    ...new Set(products.map((product) => product.brand)),
  ];

  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ products, brand }));
  }, [dispatch, products, brand]);

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, price }));
  }, [dispatch, products, price]);

  const filterProducts = (cat) => {
    setCategory(cat);
    dispatch(FILTER_BY_CATEGORY({ products, category: cat }));
  };

  const clearFilters = () => {
    setCategory("All");
    setBrand("All");
    setPrice(maxPrice);
  };

  return (
    <Stack spacing={2} sx={{background:'white', p:2, zIndex: 4}}>
      <Typography variant="h5">Categories</Typography>
      <Box sx={{display:'flex', flexDirection:'column', gap: 1}}>
        {allCategories.map((cat, index) => {
          return (
            <Button
              key={index}
              variant={category === cat ? "contained" : "outlined"}
              onClick={() => filterProducts(cat)}
            >
              {cat}
            </Button>
          );
        })}
      </Box>
      <Typography variant="h5">Brand</Typography>
      <Box>
        <Select value={brand} onChange={(e) => setBrand(e.target.value)} fullWidth>
          {allBrands.map((brand, index) => {
            return (
              <MenuItem key={index} value={brand} >
                {brand}
              </MenuItem>
            );
          })}
        </Select>
        <Typography variant="h5">Price</Typography>
        <Typography variant="body1">{`$${price}`}</Typography>
        <Box>
          <Slider
            type="range"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min={minPrice}
            max={maxPrice}
          />
        </Box>
        <br />
        <Button variant="contained" color="error" onClick={clearFilters}>
          Clear Filter
        </Button>
      </Box>
    </Stack>
  );
};

export default ProductFilter;
