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
  items: CartProduct[]
}

export type OrderProduct = {
  item: CartProduct
}
