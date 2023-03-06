import { Container, Toolbar } from '@mui/material'
import React from 'react'
import Product from '../components/product/Product'

const Home = () => {
  return (
    <Container>
      <Toolbar/>
        <Product/>
    </Container>
  )
}

export default Home