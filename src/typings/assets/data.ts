export type Product = {
  id: string
  ownerId: string
  imageUrl: string
  title: string
  description: string
  price: number
}

export type CartProduct = {
  quantity: number
} & Product

export type OrderProduct = {
  id: string
  item: CartProduct
}
