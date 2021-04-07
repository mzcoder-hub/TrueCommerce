import axios from 'axios'
import { CART_ADD_ITEM } from '../constants/cartConstants'

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
