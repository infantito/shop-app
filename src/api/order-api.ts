import type { CreateOrderRequest } from '~typings/api'
import type { Order, User } from '~typings/assets/data'
import { API } from '~constants'

const OrderAPI = {
  getUserOrders: async (token: string, userId: User['id']) => {
    try {
      const url = new URL(API.GetUserOrders)

      url.searchParams.append('userId', userId.toString())

      const response = await fetch(API.CreateProduct, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      const json = await response.json()

      return json as Order[]
    } catch (error) {
      return []
    }
  },
  createOrder: async (token: string, order: CreateOrderRequest) => {
    try {
      const response = await fetch(API.CreateOrder, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      })

      const json = await response.json()

      return json as Order
    } catch (error) {
      return null
    }
  },
}

export default OrderAPI
