import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import type { Product } from '~typings/assets/data'
import type {
  CreateProductRequest,
  DeleteProductRequest,
  FetchProductsRequest,
  FetchUserProductsRequest,
  ProductStatus,
  UpdateProductRequest,
} from '~typings/api'
import type { RootState } from '~typings/store'
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
  status: 'fetching' as ProductStatus,
}

export const fetchProducts = createAsyncThunk('fetchProducts', async (params: FetchProductsRequest) => {
  const { token } = params

  const json = await ProductAPI.getProducts(token)

  return json
})

export const fetchUserProducts = createAsyncThunk('fetchUserProducts', async (params: FetchUserProductsRequest) => {
  const { userId, token } = params

  const json = await ProductAPI.getUserProducts(userId, token)

  return json
})

export const createProduct = createAsyncThunk('createProduct', async (params: CreateProductRequest, thunkAPI) => {
  const { token, product } = params

  const { auth } = thunkAPI.getState() as RootState

  const json = await ProductAPI.createProduct({ product, token })

  thunkAPI.dispatch(fetchUserProducts({ token, userId: auth.user.id, status: 'creating' }))

  return json
})

export const updateProduct = createAsyncThunk('updateProduct', async (params: UpdateProductRequest, thunkAPI) => {
  const { token, product } = params

  const { auth } = thunkAPI.getState() as RootState

  const json = await ProductAPI.updateProduct({ product, token })

  thunkAPI.dispatch(fetchUserProducts({ token, userId: auth.user.id, status: 'updating' }))

  return json
})

export const deleteProduct = createAsyncThunk('deleteProduct', async (params: DeleteProductRequest, thunkAPI) => {
  const { productId, token } = params

  const { auth } = thunkAPI.getState() as RootState

  const json = await ProductAPI.deleteProduct(productId, token)

  thunkAPI.dispatch(fetchUserProducts({ token, userId: auth.user.id, status: 'deleting' }))

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

    builder.addCase(createProduct.fulfilled, (state, action) => {
      return {
        ...state,
        status: null,
      }
    })

    builder.addCase(createProduct.pending, (state, action) => {
      return {
        ...state,
        status: 'creating',
      }
    })

    builder.addCase(createProduct.rejected, (state, action) => {
      return {
        ...state,
        status: 'error',
      }
    })

    builder.addCase(updateProduct.fulfilled, (state, action) => {
      return {
        ...state,
        status: null,
      }
    })

    builder.addCase(updateProduct.pending, (state, action) => {
      return {
        ...state,
        status: 'updating',
      }
    })

    builder.addCase(updateProduct.rejected, (state, action) => {
      return {
        ...state,
        status: 'error',
      }
    })

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      return {
        ...state,
        status: null,
      }
    })

    builder.addCase(deleteProduct.pending, (state, action) => {
      return {
        ...state,
        status: 'updating',
      }
    })

    builder.addCase(deleteProduct.rejected, (state, action) => {
      return {
        ...state,
        status: 'error',
      }
    })
  },
})

const productReducer = productSlice.reducer

export default productReducer
