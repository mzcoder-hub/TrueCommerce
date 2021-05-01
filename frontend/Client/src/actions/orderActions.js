import Axios from 'axios'
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_PAID_FAIL,
  ORDER_LIST_PAID_REQUEST,
  ORDER_LIST_PAID_SUCCESS,
  ORDER_LIST_UNPAID_FAIL,
  ORDER_LIST_UNPAID_REQUEST,
  ORDER_LIST_UNPAID_SUCCESS,
  ORDER_REQUEST_PAY_FAIL,
  ORDER_REQUEST_PAY_REQUEST,
  ORDER_REQUEST_PAY_SUCCESS,
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

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await Axios.post(`/api/orders`, order, config)

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const sendRequestPay = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_REQUEST_PAY_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await Axios.get(`/api/payment/${id}/payrequest`, config)

    dispatch({
      type: ORDER_REQUEST_PAY_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: ORDER_REQUEST_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const sendCancelRequest = ({ id, reason }) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ORDER_CANCEL_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await Axios.post(`/api/orders/canceled/${id}`, reason, config)

    dispatch({
      type: ORDER_CANCEL_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: ORDER_CANCEL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const sendRecievedRequest = ({ id }) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_RECIEVED_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await Axios.post(`/api/orders/recieved/${id}`, id, config)

    dispatch({
      type: ORDER_RECIEVED_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: ORDER_RECIEVED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await Axios.get(`/api/orders/${id}`, config)

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listOrdersPaid = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_PAID_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await Axios.get(`/api/orders/paid/${id}`, config)

    dispatch({
      type: ORDER_LIST_PAID_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_LIST_PAID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listOrdersUnPaid = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_UNPAID_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await Axios.get(`/api/orders/unpaid/${id}`, config)

    dispatch({
      type: ORDER_LIST_UNPAID_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_LIST_UNPAID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listOrdersDelivered = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_DELIVERED_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await Axios.get(`/api/orders/delivered/${id}`, config)

    dispatch({
      type: ORDER_LIST_DELIVERED_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_LIST_DELIVERED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
