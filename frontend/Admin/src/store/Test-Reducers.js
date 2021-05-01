import * as actionTypes from './constant'
import config from './../config'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productCreateReviewReducer,
  productTopRatedReducer,
} from './Reducers/productReducers'
import { cartReducer } from './Reducers/cartReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './Reducers/userReducers'
import {
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListPaidReducer,
  orderListMyReducer,
  orderListReducer,
  orderPayReducer,
  orderListUnPaidReducer,
  orderReturnReducer,
} from './Reducers/orderReducers'
import {
  categoryDetailsReducer,
  categoryListReducer,
  categoryUpdateReducer,
  categoryCreateReducer,
  categoryDeleteReducer,
} from './Reducers/categoryReducers'

const initReducer = {
  isOpen: [], //for active default menu
  isTrigger: [], //for active default menu, set blank for horizontal
  ...config,
  isFullScreen: false, // static can't change
}

const reducer = (state = initReducer, action) => {
  let trigger = []
  let open = []

  switch (action.type) {
    case actionTypes.COLLAPSE_MENU:
      return {
        ...state,
        collapseMenu: !state.collapseMenu,
      }
    case actionTypes.COLLAPSE_TOGGLE:
      if (action.menu.type === 'sub') {
        open = state.isOpen
        trigger = state.isTrigger

        const triggerIndex = trigger.indexOf(action.menu.id)
        if (triggerIndex > -1) {
          open = open.filter((item) => item !== action.menu.id)
          trigger = trigger.filter((item) => item !== action.menu.id)
        }

        if (triggerIndex === -1) {
          open = [...open, action.menu.id]
          trigger = [...trigger, action.menu.id]
        }
      } else {
        open = state.isOpen
        const triggerIndex = state.isTrigger.indexOf(action.menu.id)
        trigger = triggerIndex === -1 ? [action.menu.id] : []
        open = triggerIndex === -1 ? [action.menu.id] : []
      }

      return {
        ...state,
        isOpen: open,
        isTrigger: trigger,
      }
    case actionTypes.NAV_CONTENT_LEAVE:
      return {
        ...state,
        isOpen: open,
        isTrigger: trigger,
      }
    case actionTypes.NAV_COLLAPSE_LEAVE:
      if (action.menu.type === 'sub') {
        open = state.isOpen
        trigger = state.isTrigger

        const triggerIndex = trigger.indexOf(action.menu.id)
        if (triggerIndex > -1) {
          open = open.filter((item) => item !== action.menu.id)
          trigger = trigger.filter((item) => item !== action.menu.id)
        }
        return {
          ...state,
          isOpen: open,
          isTrigger: trigger,
        }
      }
      return { ...state }
    case actionTypes.FULL_SCREEN:
      return {
        ...state,
        isFullScreen: !state.isFullScreen,
      }
    case actionTypes.FULL_SCREEN_EXIT:
      return {
        ...state,
        isFullScreen: false,
      }
    case actionTypes.CHANGE_LAYOUT:
      return {
        ...state,
        layout: action.layout,
      }
    default:
      return state
  }
}

const combineReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productCreateReview: productCreateReviewReducer,
  productTopRated: productTopRatedReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderDetailsPaid: orderListPaidReducer,
  orderDetailsNotPaid: orderListUnPaidReducer,
  orderReturnDelivery: orderReturnReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderMyList: orderListMyReducer,
  orderList: orderListReducer,
  categoryList: categoryListReducer,
  categoryDetail: categoryDetailsReducer,
  categoryUpdate: categoryUpdateReducer,
  categoryCreate: categoryCreateReducer,
  categoryDelete: categoryDeleteReducer,
  reducer,
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

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
}

const middleware = [thunk]

const reducerzz = createStore(
  combineReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default reducerzz
