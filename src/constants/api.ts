export const DOMAIN = process.env.REACT_APP_DOMAIN || 'http://localhost:4000'

export const API = {
  SignIn: `${DOMAIN}/signin`,
  SignUp: `${DOMAIN}/signup`,
  GetProducts: `${DOMAIN}/products`,
  GetUserProducts: `${DOMAIN}/products/:userId`,
  GetOrders: `${DOMAIN}/orders`,
  CreateProduct: `${DOMAIN}/products`,
  UpdateProduct: `${DOMAIN}/products/:productId`,
  DeleteProduct: `${DOMAIN}/products/:productId`,
} as const
