import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { Order } from '~typings/assets/data'

export enum OrderAction {
  GET_ORDERS = 'GET_ORDERS',
  ADD_ORDER = 'ADD_ORDER',
}

const initialState = {
  orders: [] as Order[],
}

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
    [OrderAction.ADD_ORDER]: (state, action: PayloadAction<Order>) => {
      return {
        ...state,
        orders: [...state.orders, action.payload],
      }
    },
  },
})

export const { ADD_ORDER: addOrder, GET_ORDERS: getOrders } = orderSlice.actions

const orderReducer = orderSlice.reducer

export default orderReducer
