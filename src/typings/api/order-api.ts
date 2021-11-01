import type { Product, User } from '~typings/assets/data'

export type OrderStatus = 'fetching' | 'refreshing' | 'creating' | 'error'

export type CreateOrderRequest = {
  id: string
  userId: User['id']
  items: Product[]
  date: number
}
