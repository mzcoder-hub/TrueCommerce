import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productDetailsReducer,
  productListReducer,
} from './reducers/productReducers'

import { cartReducer } from './reducers/cartReducers'
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers'
import {
  postalCityReducers,
  postalCostDeliveryReducers,
  postalProvinceReducers,
  postalSubDistrictReducers,
} from './reducers/postalReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  postalProvince: postalProvinceReducers,
  postalCity: postalCityReducers,
  postalSubDistrict: postalSubDistrictReducers,
  costDelivery: postalCostDeliveryReducers,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

// const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
//   ? JSON.parse(localStorage.getItem('paymentMethod'))
//   : {}

// const serviceDeliveryFromStorage = localStorage.getItem('serviceDelivery')
//   ? JSON.parse(localStorage.getItem('serviceDelivery'))
//   : {}

// const costDeliveryFromStorage = localStorage.getItem('listCostDeliveryData')
//   ? JSON.parse(localStorage.getItem('listCostDeliveryData'))
//   : {}
//   costDelivery: costDeliveryFromStorage,

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    // paymentMethod: paymentMethodFromStorage,
    // serviceDelivery: serviceDeliveryFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
