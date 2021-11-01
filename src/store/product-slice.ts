import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import type { Product, User } from '~typings/assets/data'
import { ProductAPI } from '~api'

export enum ProductAction {
  GET_PRODUCTS = 'GET_PRODUCTS',
  CREATE_PRODUCT = 'CREATE_PRODUCT',
  UPDATE_PRODUCT = 'UPDATE_PRODUCT',
  DELETE_PRODUCT = 'DELETE_PRODUCT',
}

const initialState = {
  availableProducts: [] as Product[],
  userProducts: [] as Product[],
  status: 'fetching' as 'fetching' | 'refreshing' | 'error',
}

export const fetchProducts = createAsyncThunk(
  'fetchProducts',
  async (params: { token: string; status: typeof initialState.status }) => {
    const { token, status } = params

    const json = await ProductAPI.getProducts(token)

    return [json, status] as const
  }
)

export const fetchUserProducts = createAsyncThunk(
  'fetchUserProducts',
  async (params: { userId: User['id']; token: string; status: typeof initialState.status }) => {
    const { userId, token } = params

    const json = await ProductAPI.getUserProducts(userId, token)

    return [json, status] as const
  }
)

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    [ProductAction.CREATE_PRODUCT]: (state, action) => {
      return {
        ...state,
        status: null,
        availableProducts: [...state.availableProducts, action.payload],
        userProducts: [...state.userProducts, action.payload],
      }
    },
    [ProductAction.UPDATE_PRODUCT]: (state, action) => {
      return {
        ...state,
        status: null,
        availableProducts: [...state.availableProducts, action.payload],
        userProducts: [...state.userProducts, action.payload],
      }
    },
    [ProductAction.DELETE_PRODUCT]: (state, action) => {
      return {
        ...state,
        status: null,
        availableProducts: [...state.availableProducts, action.payload],
        userProducts: [...state.userProducts, action.payload],
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      const [availableProducts, status] = action.payload

      return {
        ...state,
        status: null,
        availableProducts,
      }
    })

    builder.addCase(fetchProducts.pending, (state, action) => {
      const { status } = action.meta.arg

      return {
        ...state,
        status,
      }
    })

    builder.addCase(fetchProducts.rejected, (state, action) => {
      return {
        ...state,
        status: 'error',
        availableProducts: [],
      }
    })

    builder.addCase(fetchUserProducts.fulfilled, (state, action) => {
      const [userProducts, status] = action.payload

      return {
        ...state,
        status: null,
        userProducts,
      }
    })

    builder.addCase(fetchUserProducts.pending, (state, action) => {
      const { status } = action.meta.arg

      return {
        ...state,
        status,
      }
    })

    builder.addCase(fetchUserProducts.rejected, (state, action) => {
      return {
        ...state,
        status: 'error',
        userProducts: [],
      }
    })
  },
})

export const {
  CREATE_PRODUCT: createProduct,
  UPDATE_PRODUCT: updateProduct,
  DELETE_PRODUCT: deleteProduct,
} = productSlice.actions

const productReducer = productSlice.reducer

export default productReducer
