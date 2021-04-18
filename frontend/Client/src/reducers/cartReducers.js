import {
  CART_ADD_ITEM,
  CART_ITEM_RESET,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SERVICE_DELIVERY_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants'

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {}, serviceDelivery: '' },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload

      const existItem = state.cartItems.find(
        (x) =>
          x.product === item.product && x.variant[0].sku === item.variant[0].sku
      )
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x) => x.variant[0].sku !== action.payload
        ),
      }
    case CART_ITEM_RESET:
      return { cartItems: [] }
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      }
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      }
    case CART_SAVE_SERVICE_DELIVERY_METHOD:
      return {
        ...state,
        serviceDelivery: action.payload,
      }
    default:
      return state
  }
}
