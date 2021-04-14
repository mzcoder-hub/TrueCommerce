import {
  POSTAL_GET_PROVINCE_FAIL,
  POSTAL_GET_PROVINCE_REQUEST,
  POSTAL_GET_PROVINCE_SUCCESS,
  POSTAL_GET_CITY_FAIL,
  POSTAL_GET_CITY_REQUEST,
  POSTAL_GET_CITY_SUCCESS,
  POSTAL_GET_SUBDISTRICT_REQUEST,
  POSTAL_GET_SUBDISTRICT_SUCCESS,
  POSTAL_GET_SUBDISTRICT_FAIL,
} from '../constants/postalConstants'

export const postalProvinceReducers = (state = { province: [] }, action) => {
  switch (action.type) {
    case POSTAL_GET_PROVINCE_REQUEST:
      return { loading: true, province: [] }
    case POSTAL_GET_PROVINCE_SUCCESS:
      return { loading: false, province: action.payload }
    case POSTAL_GET_PROVINCE_FAIL:
      return { error: action.payload }
    default:
      return state
  }
}

export const postalCityReducers = (state = { city: [] }, action) => {
  switch (action.type) {
    case POSTAL_GET_CITY_REQUEST:
      return { loading: true, city: [] }
    case POSTAL_GET_CITY_SUCCESS:
      return { loading: false, city: action.payload }
    case POSTAL_GET_CITY_FAIL:
      return { error: action.payload }
    default:
      return state
  }
}

export const postalSubDistrictReducers = (
  state = { subdistrict: [] },
  action
) => {
  switch (action.type) {
    case POSTAL_GET_SUBDISTRICT_REQUEST:
      return { loading: true, subdistrict: [] }
    case POSTAL_GET_SUBDISTRICT_SUCCESS:
      return { loading: false, subdistrict: action.payload, success: true }
    case POSTAL_GET_SUBDISTRICT_FAIL:
      return { error: action.payload }
    default:
      return state
  }
}
