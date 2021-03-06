import React from 'react'
import { Grid } from '@material-ui/core'
import Header from '../components/Header'
import NavigationBottom from '../components/NavigationBottom'
import { Route } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import HomeScreens from './HomeScreen'
import ProductScreen from './ProductScreen'
import ProductByCategoryScreen from './ProductByCategoryScreen'
import AddToCartCheckout from '../components/AddToCartCheckout'

const Layouting = () => {
  const location = useLocation()
  const splitPath = location.pathname.split('/')

  return (
    <Grid item xs={12}>
      <Header />
      <Route path='/' component={HomeScreens} exact />
      <Route path='/produk/:id' component={ProductScreen} exact />
      <Route path='/kategori' component={ProductByCategoryScreen} exact />
      {splitPath[1] === 'produk' ? <AddToCartCheckout /> : <NavigationBottom />}
    </Grid>
  )
}

export default Layouting
