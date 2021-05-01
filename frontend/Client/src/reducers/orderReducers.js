import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_REQUEST_PAY_REQUEST,
  ORDER_REQUEST_PAY_SUCCESS,
  ORDER_REQUEST_PAY_FAIL,
  ORDER_LIST_PAID_REQUEST,
  ORDER_LIST_PAID_SUCCESS,
  ORDER_LIST_PAID_FAIL,
  ORDER_LIST_UNPAID_REQUEST,
  ORDER_LIST_UNPAID_SUCCESS,
  ORDER_LIST_UNPAID_FAIL,
  ORDER_LIST_DELIVERED_REQUEST,
  ORDER_LIST_DELIVERED_SUCCESS,
  ORDER_LIST_DELIVERED_FAIL,
  ORDER_CANCEL_REQUEST,
  ORDER_CANCEL_SUCCESS,
  ORDER_CANCEL_FAIL,
  ORDER_RECIEVED_REQUEST,
  ORDER_RECIEVED_SUCCESS,
  ORDER_RECIEVED_FAIL,
} from '../constants/orderConstants'

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true }
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload }
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const orderRequestPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_REQUEST_PAY_REQUEST:
      return { loading: true }
    case ORDER_REQUEST_PAY_SUCCESS:
      return { loading: false, success: true }
    case ORDER_REQUEST_PAY_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const orderRequestCancelReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CANCEL_REQUEST:
      return { loading: true }
    case ORDER_CANCEL_SUCCESS:
      return { loading: false, success: true }
    case ORDER_CANCEL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const orderRequestRecievedReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_RECIEVED_REQUEST:
      return { loading: true }
    case ORDER_RECIEVED_SUCCESS:
      return { loading: false, success: true }
    case ORDER_RECIEVED_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const orderDetailsReducer = (
  state = { loading: true, order: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload }
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const orderListPaidReducer = (
  state = { loading: true, list: [] },
  action
) => {
  switch (action.type) {
    case ORDER_LIST_PAID_REQUEST:
      return { ...state, loading: true }
    case ORDER_LIST_PAID_SUCCESS:
      return { loading: false, list: action.payload }
    case ORDER_LIST_PAID_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const orderListUnPaidReducer = (
  state = { loading: true, list: [] },
  action
) => {
  switch (action.type) {
    case ORDER_LIST_UNPAID_REQUEST:
      return { ...state, loading: true }
    case ORDER_LIST_UNPAID_SUCCESS:
      return { loading: false, list: action.payload }
    case ORDER_LIST_UNPAID_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const orderListDeliveredReducer = (
  state = { loading: true, list: [] },
  action
) => {
  switch (action.type) {
    case ORDER_LIST_DELIVERED_REQUEST:
      return { ...state, loading: true }
    case ORDER_LIST_DELIVERED_SUCCESS:
      return { loading: false, list: action.payload }
    case ORDER_LIST_DELIVERED_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
