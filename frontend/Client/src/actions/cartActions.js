import axios from 'axios'
import {
  CART_ADD_ITEM,
  CART_ITEM_RESET,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SERVICE_DELIVERY_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants'

export const addToCart = (id, qty, sku) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  const getvariant = data.variant
  const variant = []
  await getvariant.forEach((databasez) => {
    if (databasez.sku === sku) {
      variant.push(databasez)
    }
  })

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      slug: data.slug,
      name: data.name,
      primaryImage: data.primaryImage,
      variant,
      price: variant.harga,
      countInStock: data.countInStock,
      qty,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const resetCart = () => (dispatch, getState) => {
  dispatch({
    type: CART_ITEM_RESET,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })

  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}

export const saveServiceDeliveryMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SERVICE_DELIVERY_METHOD,
    payload: data,
  })

  localStorage.setItem('servicedelivery', JSON.stringify(data))
}
