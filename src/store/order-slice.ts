import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { CreateOrderRequest, OrderStatus } from '~typings/api'
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

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    [OrderAction.GET_ORDERS]: (state, action: PayloadAction<Order[]>) => {
      return {
        ...state,
        orders: action.payload,
      }
    },
  },
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
  },
})

export const { GET_ORDERS: getOrders } = orderSlice.actions

const orderReducer = orderSlice.reducer

export default orderReducer
