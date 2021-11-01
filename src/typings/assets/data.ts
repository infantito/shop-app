export type User = {
  id: number
  email: string
  password: string
}

export type Product = {
  id: number
  ownerId: User['id']
  imageUrl: string
  title: string
  description: string
  price: number
}

export type CartProduct = {
  quantity: number
} & Product

export type Order = {
  id: number
  userId: User['id']
  items: CartProduct[]
  date: number
}

export type OrderProduct = CartProduct
