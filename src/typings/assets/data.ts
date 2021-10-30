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
  items: CartProduct[]
  userId: User['id']
  date: number
}

export type OrderProduct = CartProduct
