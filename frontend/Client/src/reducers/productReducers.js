import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_RESET,
  CATEGORY_DETAIL_REQUEST,
  CATEGORY_DETAIL_SUCCESS,
  CATEGORY_DETAIL_FAIL,
  CATEGORY_DETAIL_RESET,
  PRODUCT_LIST_by_category_REQUEST,
  PRODUCT_LIST_by_category_SUCCESS,
  PRODUCT_LIST_by_category_FAIL,
} from '../constants/productConstants'

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productListByCategoryReducer = (
  state = { products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_by_category_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_LIST_by_category_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case PRODUCT_LIST_by_category_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productDetailsReducer = (
  state = { product: { reviews: [], image: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state }
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload }
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const categoryListReducer = (
  state = { loading: true, category: [] },
  action
) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { loading: true, category: [] }
    case CATEGORY_LIST_SUCCESS:
      return {
        loading: false,
        category: action.payload.category,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload }
    case CATEGORY_LIST_RESET:
      return { category: [] }
    default:
      return state
  }
}

export const categoryDetailsReducer = (
  state = { loading: true, category: {} },
  action
) => {
  switch (action.type) {
    case CATEGORY_DETAIL_REQUEST:
      return { loading: true, ...state }
    case CATEGORY_DETAIL_SUCCESS:
      return { loading: false, category: action.payload }
    case CATEGORY_DETAIL_FAIL:
      return { loading: false, error: action.payload }
    case CATEGORY_DETAIL_RESET:
      return { category: {} }
    default:
      return state
  }
}
