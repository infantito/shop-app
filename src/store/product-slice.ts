import { createSlice } from '@reduxjs/toolkit'

import type { Product } from '~typings/assets/data'

export enum ProductAction {
  GET_PRODUCTS = 'GET_PRODUCTS',
  CREATE_PRODUCT = 'CREATE_PRODUCT',
  UPDATE_PRODUCT = 'UPDATE_PRODUCT',
  DELETE_PRODUCT = 'DELETE_PRODUCT',
}

const initialState = {
  availableProducts: [] as Product[],
  userProducts: [] as Product[],
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    [ProductAction.GET_PRODUCTS]: (state, action) => {
      return {
        ...state,
        availableProducts: [...state.availableProducts, action.payload],
      }
    },
    [ProductAction.CREATE_PRODUCT]: (state, action) => {
      return {
        ...state,
        availableProducts: [...state.availableProducts, action.payload],
        userProducts: [...state.userProducts, action.payload],
      }
    },
    [ProductAction.UPDATE_PRODUCT]: (state, action) => {
      return {
        ...state,
        availableProducts: [...state.availableProducts, action.payload],
        userProducts: [...state.userProducts, action.payload],
      }
    },
    [ProductAction.DELETE_PRODUCT]: (state, action) => {
      return {
        ...state,
        availableProducts: [...state.availableProducts, action.payload],
        userProducts: [...state.userProducts, action.payload],
      }
    },
  },
})

export const {
  GET_PRODUCTS: getProducts,
  CREATE_PRODUCT: createProduct,
  UPDATE_PRODUCT: updateProduct,
  DELETE_PRODUCT: deleteProduct,
} = productSlice.actions

const productReducer = productSlice.reducer

export default productReducer
