import type { ScreenProps } from '~typings/router'
import { Routes } from '~constants'
import { CompositeScreenProps } from '@react-navigation/core'

export type ProductsProps = CompositeScreenProps<
  ScreenProps<Routes.USER_PRODUCTS>,
  ScreenProps<Routes.PRODUCTS_OVERVIEW>
>
