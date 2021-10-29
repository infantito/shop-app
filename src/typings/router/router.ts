import type { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'

import type { Product } from '~typings/assets/data'
import { Routes } from '~constants'

export type ProductDetailParams = { product: Product }

export type UpdateProductParams = { productId?: Product['id'] }

export type ProductsParams = { token: string }

export type ShopParams = { token: string }

export type ParamListPerRoute = {
  [Routes.HOME]: undefined
  [Routes.AUTH]: undefined
  [Routes.CART]: undefined
  [Routes.ORDERS]: undefined
  [Routes.PRODUCTS_OVERVIEW]: ProductsParams
  [Routes.USER_PRODUCTS]: ProductsParams
  [Routes.PRODUCT_DETAIL]: ProductDetailParams
  [Routes.UPDATE_PRODUCT]: UpdateProductParams
  [Routes.SHOP]: ShopParams
}

export type RootStackParamList<Route extends keyof ParamListPerRoute> = StackNavigationProp<ParamListPerRoute, Route>

export type ScreenProps<Route extends keyof ParamListPerRoute> = StackScreenProps<ParamListPerRoute, Route>

export type RouterProps = {}
