import React from 'react'
import Grid from '@material-ui/core/Grid'
import Header from '../components/Header'
import NavigationBottom from '../components/NavigationBottom'
import { Route } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import HomeScreens from './HomeScreen'
import ProductScreen from './ProductScreen'
import ProductByCategoryScreen from './ProductByCategoryScreen'
import CartScreen from './CartScreen'
import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'
import ProfileScreen from './ProfileScreen'
import ProfileEditScreen from './ProfileEditScreen'
import ShippingScreen from './ShippingScreen'
import PaymentScreens from './PaymentScreen'
import PlaceOrderScreen from './PlaceOrderScreen'
import DeliveryScreen from './DeliveryScreen'

const Layouting = () => {
  const location = useLocation()
  const splitPath = location.pathname.split('/')

  return (
    <Grid item xs={12}>
      <Header />
      <Route path='/' component={HomeScreens} exact />
      <Route path='/produk/:slug' component={ProductScreen} />
      <Route path='/kategori' component={ProductByCategoryScreen} />
      <Route path='/cart/:sku/:id?' component={CartScreen} />
      <Route path='/cart' component={CartScreen} exact />
      <Route path='/pengiriman' component={ShippingScreen} />
      <Route path='/metode' component={PaymentScreens} />
      <Route path='/ekspedisi' component={DeliveryScreen} />
      <Route path='/verifikasi' component={PlaceOrderScreen} />
      <Route path='/profile' component={ProfileScreen} exact />
      <Route path='/profile/edit' component={ProfileEditScreen} />
      <Route path='/login' component={LoginScreen} />
      <Route path='/register' component={RegisterScreen} />
      {splitPath[1] === 'produk' ? <></> : <NavigationBottom />}
    </Grid>
  )
}

export default Layouting
