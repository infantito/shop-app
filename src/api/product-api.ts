import type { Product, User } from '~typings/assets/data'
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
  createProduct: async (product: Product, token: string) => {
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
  updateProduct: async (product: Product, token: string) => {
    try {
      const response = await fetch(API.UpdateProduct, {
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
      const response = await fetch(API.DeleteProduct, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: productId }),
      })

      const json = await response.json()

      return json as Product
    } catch (error) {
      return {} as Product
    }
  },
}

export default ProductAPI
