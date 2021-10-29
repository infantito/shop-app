export type User = {
  id: string
  username: string
  password: string
}

export type Product = {
  id: string
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
  id: string
  date: number
  items: CartProduct[]
}

export type OrderProduct = CartProduct

export type UserAuth = {
  user: User
  token: string
  expiresIn: number
}
