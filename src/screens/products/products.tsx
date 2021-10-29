import * as React from 'react'

import type { ProductsProps as Props } from '~typings/screens'
import { Routes } from '~constants'
import ProductsOverview from './products-overview'
import UserProducts from './user-products'

const Products = (props: Props) => {
  const { route } = props

  if (route.name === Routes.USER_PRODUCTS) {
    return <UserProducts {...props} />
  }

  return <ProductsOverview {...props} />
}

export default Products
