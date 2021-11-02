import { createAsyncThunk } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { CreateOrderRequest, GetUserOrdersRequest, OrderStatus } from '~typings/api'
import type { Order } from '~typings/assets/data'
import { OrderAPI } from '~api'
import { clearCart } from './cart-slice'

export enum OrderAction {
  GET_ORDERS = 'GET_ORDERS',
  CREATE_ORDER = 'CREATE_ORDER',
}

const initialState = {
  orders: [] as Order[],
  status: null as OrderStatus,
}

export const createOrder = createAsyncThunk(
  'createOrder',
  async (params: Pick<CreateOrderRequest, 'items' | 'userId'> & { token: string }, thunkAPI) => {
    const { items, userId, token } = params

    thunkAPI.dispatch(clearCart())

    const order: CreateOrderRequest = {
      id: Date.now().toString(36),
      items,
      userId,
      date: Date.now(),
    }

    const json = await OrderAPI.createOrder(token, order)

    return json
  }
)

export const getUserOrders = createAsyncThunk('getUserOrders', async (params: GetUserOrdersRequest) => {
  const { token, userId } = params

  const json = await OrderAPI.getUserOrders(token, userId)

  return json
})

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createOrder.fulfilled, (state, action) => {
      return {
        ...state,
        status: null,
      }
    })

    builder.addCase(createOrder.pending, (state, action) => {
      return {
        ...state,
        status: 'creating',
      }
    })

    builder.addCase(createOrder.rejected, (state, action) => {
      return {
        ...state,
        status: 'error',
      }
    })

    builder.addCase(getUserOrders.fulfilled, (state, action) => {
      return {
        ...state,
        status: null,
        orders: action.payload,
      }
    })

    builder.addCase(getUserOrders.pending, (state, action) => {
      const { status } = action.meta.arg

      return {
        ...state,
        status,
      }
    })

    builder.addCase(getUserOrders.rejected, (state, action) => {
      return {
        ...state,
        status: 'error',
      }
    })
  },
})

const orderReducer = orderSlice.reducer

export default orderReducer
