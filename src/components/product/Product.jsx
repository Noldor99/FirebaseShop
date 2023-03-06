import { Grid, Slide, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import ProductFilter from './ProductFilter';
import ProductList from './ProductList';
import useFetchCollection from "../../customHooks/useFetchCollection";

import { Transition } from 'react-transition-group';
import { GET_PRICE_RANGE,STORE_PRODUCTS, selectProducts } from '../../store/slice/productSlice';
import { selectshowFilter } from '../../store/slice/filterSlice';

const Product = () => {
 
  const { data, isLoading } = useFetchCollection("products");

  const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const products = useSelector(selectProducts);
  const showFilter = useSelector(selectshowFilter);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );

    dispatch(
      GET_PRICE_RANGE({
        products: data,
      })
    );
  }, [dispatch, data]);
  
  return (
    <Box sx={{ mt: 2, mb: 2 }}> 

      <Grid container spacing={2} sx={{ mb: '30px' }}>
        <Grid item xs={12} sm={showFilter ? 2 : false} sx={{ zIndex: matches ? 4 : 'inherit', position: matches && 'absolute'}}>
          <Transition in={showFilter} timeout={100} mountOnEnter unmountOnExit>
            {(state) => (
              <Slide direction="right" in={state === 'entered'} mountOnEnter unmountOnExit>
                <div style={{ transformOrigin: '0 0 0' }}>
                  <ProductFilter sx={{ opacity: state === 'entered' ? 1 : 0 }} />
                </div>
              </Slide>
            )}
          </Transition>
        </Grid>
        <Grid item xs={12} sm={showFilter ? 10 : 12}>
          <ProductList 
            products={products}
            />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Product;
