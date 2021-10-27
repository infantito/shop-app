import { configureStore } from '@reduxjs/toolkit'

import authReducer from './auth-slice'
import cartReducer from './cart-slice'
import orderReducer from './order-slice'
import productReducer from './product-slice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    product: productReducer,
  },
})

export default store
