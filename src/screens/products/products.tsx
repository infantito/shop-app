import * as React from 'react'
import { useSelector } from 'react-redux'

import type { RootState } from '~typings/store'
import type { ProductsProps as Props } from '~typings/screens'
import ProductsOverview from './products-overview'
import UserProducts from './user-products'

const Products = (props: Props) => {
  const token = useSelector((state: RootState) => state.auth.token)

  if (token) {
    return <UserProducts {...props} />
  }

  return <ProductsOverview {...props} />
}

export default Products
