import { Grid, IconButton, Card, CardMedia, CardContent, Pagination, Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import { data } from '../../data';
import MySearch from '../MySearch';
import SortBy from '../SortBy';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';

import { useDispatch, useSelector } from "react-redux";
import { FILTER_BY_SEARCH, selectFilteredProducts, SORT_PRODUCTS } from '../../store/slice/filterSlice';
import ShowFilter from './ShowFilter';
import ProductItem from './ProductItem';



const ProductList = ({ products }) => {

  const [isGridView, setIsGridView] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const filteredProducts = useSelector(selectFilteredProducts);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  // Get Current Products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );


  const handleChange = (event, value) => {
    setCurrentPage(value);
  };



  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SORT_PRODUCTS({ products, sort }));
  }, [dispatch, products, sort]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);


  return (
    <>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 2, sm: 2, md: 3 }}
        sx={{ mb: '30px', alignItems: 'center' }}>
        <Grid item xs={7} sm={3} sx={{ width: '100%' }} >
          <MySearch value={search} onChange={(e) => setSearch(e.target.value)} />
        </Grid>
        <Grid item xs={5} sm={5} sx={{ width: '100%' }} >
          <ShowFilter />
        </Grid>

        <Grid item xs={10} sm={3} sx={{ width: '100%' }}
          justifyContent="flex-end" display="flex">
          <SortBy value={sort} onChange={(e) => setSort(e.target.value)} />
        </Grid>
        <Grid item xs={2} sm={1} sx={{ width: '100%' }} >
          <IconButton onClick={() => setIsGridView(!isGridView)}>
            {isGridView ? <ViewListIcon /> : <ViewModuleIcon />}
          </IconButton>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mb: '30px' }}>
        {currentProducts.map((item) => (
          <ProductItem item={item} isGridView={isGridView}/>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(products.length / productsPerPage)}
        page={currentPage}
        onChange={handleChange} />
    </>
  )
}

export default ProductList