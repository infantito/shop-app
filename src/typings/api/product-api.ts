import type { Product, User } from '~typings/assets/data'

export type ProductStatus = 'fetching' | 'refreshing' | 'creating' | 'updating' | 'deleting' | 'error'

export type FetchProductsRequest = {
  token: string
  status: ProductStatus
}

export type FetchUserProductsRequest = {
  userId: User['id']
  token: string
  status: ProductStatus
}

export type CreateProductRequest = {
  product: Omit<Product, 'id'>
  token: string
}

export type UpdateProductRequest = {
  product: Product
  token: string
}

export type DeleteProductRequest = {
  productId: Product['id']
  token: string
}
