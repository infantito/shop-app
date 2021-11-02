import type { Product, User } from '~typings/assets/data'
import type { CreateProductRequest, UpdateProductRequest } from '~typings/api'
import { API } from '~constants'

const ProductAPI = {
  getProducts: async (token: string) => {
    try {
      const response = await fetch(API.GetProducts, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      const json = await response.json()

      return json as Product[]
    } catch (error) {
      return []
    }
  },
  getUserProducts: async (userId: User['id'], token: string) => {
    try {
      const url = new URL(API.GetUserProducts)

      url.searchParams.append('ownerId', userId.toString())

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      const json = await response.json()

      return json as Product[]
    } catch (error) {
      return []
    }
  },
  createProduct: async (params: CreateProductRequest) => {
    const { product, token } = params

    try {
      const response = await fetch(API.CreateProduct, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })

      const json = await response.json()

      return json as Product
    } catch (error) {
      return {} as Product
    }
  },
  updateProduct: async (params: UpdateProductRequest) => {
    const { product, token } = params

    try {
      const response = await fetch(`${API.UpdateProduct}/${product.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })

      const json = await response.json()

      return json as Product
    } catch (error) {
      return {} as Product
    }
  },
  deleteProduct: async (productId: Product['id'], token: string) => {
    try {
      const response = await fetch(`${API.DeleteProduct}/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      const json = await response.json()

      return json as Product
    } catch (error) {
      return {} as Product
    }
  },
}

export default ProductAPI
