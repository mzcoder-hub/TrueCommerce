import axios from 'axios'
import {
  POSTAL_GET_CITY_FAIL,
  POSTAL_GET_CITY_REQUEST,
  POSTAL_GET_CITY_SUCCESS,
  POSTAL_GET_PROVINCE_FAIL,
  POSTAL_GET_PROVINCE_REQUEST,
  POSTAL_GET_PROVINCE_SUCCESS,
  POSTAL_GET_SUBDISTRICT_FAIL,
  POSTAL_GET_SUBDISTRICT_REQUEST,
  POSTAL_GET_SUBDISTRICT_SUCCESS,
} from '../constants/postalConstants'

export const listProvinceId = () => async (dispatch, getState) => {
  try {
    dispatch({ type: POSTAL_GET_PROVINCE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/postal/province`, config)
    dispatch({
      type: POSTAL_GET_PROVINCE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    // if (message === 'Not authorized, token failed') {
    //   dispatch(logout())
    // }
    dispatch({
      type: POSTAL_GET_PROVINCE_FAIL,
      payload: message,
    })
  }
}

export const listCityId = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: POSTAL_GET_CITY_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    if (id) {
      const { data } = await axios.get(`/api/postal/city/${id}`, config)

      dispatch({
        type: POSTAL_GET_CITY_SUCCESS,
        payload: data,
      })
    } else {
      const { data } = await axios.get(`/api/postal/city/`, config)

      dispatch({
        type: POSTAL_GET_CITY_SUCCESS,
        payload: data,
      })
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    // if (message === 'Not authorized, token failed') {
    //   dispatch(logout())
    // }
    dispatch({
      type: POSTAL_GET_CITY_FAIL,
      payload: message,
    })
  }
}

export const listSubDistrictId = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: POSTAL_GET_SUBDISTRICT_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/postal/subdistrict/${id}`, config)
    dispatch({
      type: POSTAL_GET_SUBDISTRICT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    // if (message === 'Not authorized, token failed') {
    //   dispatch(logout())
    // }
    dispatch({
      type: POSTAL_GET_SUBDISTRICT_FAIL,
      payload: message,
    })
  }
}
