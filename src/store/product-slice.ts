import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import type { Product } from '~typings/assets/data'
import type {
  CreateProductRequest,
  DeleteProductRequest,
  FetchProductsRequest,
  FetchUserProductsRequest,
  UpdateProductRequest,
} from '~typings/api'
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

export const fetchProducts = createAsyncThunk('fetchProducts', async (params: FetchProductsRequest) => {
  const { token, status } = params

  const json = await ProductAPI.getProducts(token)

  return json
})

export const fetchUserProducts = createAsyncThunk('fetchUserProducts', async (params: FetchUserProductsRequest) => {
  const { userId, token } = params

  const json = await ProductAPI.getUserProducts(userId, token)

  return json
})

export const createProduct = createAsyncThunk('createProduct', async (params: CreateProductRequest) => {
  const { token, product } = params

  const json = await ProductAPI.createProduct(product, token)

  return json
})

export const updateProduct = createAsyncThunk('updateProduct', async (params: UpdateProductRequest) => {
  const { token, product } = params

  const json = await ProductAPI.updateProduct(product, token)

  return json
})

export const deleteProduct = createAsyncThunk('deleteProduct', async (params: DeleteProductRequest) => {
  const { productId, token } = params

  const json = await ProductAPI.deleteProduct(productId, token)

  return json
})

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      return {
        ...state,
        status: null,
        availableProducts: action.payload,
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
      return {
        ...state,
        status: null,
        userProducts: action.payload,
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

const productReducer = productSlice.reducer

export default productReducer
