import { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { CartProduct, Product } from '~typings/assets/data'

export enum CartAction {
  ADD_PRODUCT = 'ADD_PRODUCT',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART',
  CLEAR_CART = 'CLEAR_CART',
  REMOVE_FROM_ORDER = 'REMOVE_FROM_ORDER',
}

const initialState = {
  items: {} as Record<Product['id'], CartProduct>,
  totalAmount: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    [CartAction.ADD_PRODUCT]: (state, action: PayloadAction<Product>) => {
      const addedProduct = action.payload

      const prodPrice = addedProduct.price

      let updatedOrNewCartItem: CartProduct = { ...addedProduct, quantity: 1 }

      if (state.items[addedProduct.id]) {
        updatedOrNewCartItem.quantity = state.items[addedProduct.id].quantity + 1
      }

      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + prodPrice,
      }
    },
    [CartAction.REMOVE_FROM_CART]: (state, action: PayloadAction<Product>) => {
      const removedProduct = action.payload

      const selectedCartItem = state.items[removedProduct.id]

      const currentQuantity = selectedCartItem.quantity

      let updatedCartItems: typeof initialState.items = { ...state.items }

      if (currentQuantity > 1) {
        const updatedCartItem = { ...removedProduct, quantity: currentQuantity - 1 }

        updatedCartItems[removedProduct.id] = updatedCartItem
      } else {
        delete updatedCartItems[removedProduct.id]
      }

      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.price,
      }
    },
    [CartAction.CLEAR_CART]: () => {
      return initialState
    },
    [CartAction.REMOVE_FROM_ORDER]: (state, actions: PayloadAction<Product>) => {
      const product = actions.payload

      const foundProduct = state.items[product.id]

      if (!foundProduct) {
        return state
      }

      const itemTotal = foundProduct.quantity * foundProduct.price

      const updatedItems = { ...state.items }

      delete updatedItems[product.id]

      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
      }
    },
  },
})

export const {
  ADD_PRODUCT: addProduct,
  REMOVE_FROM_CART: removeFromCart,
  REMOVE_FROM_ORDER: removeFromOrder,
  CLEAR_CART: clearCart,
} = cartSlice.actions

const cartReducer = cartSlice.reducer

export default cartReducer
