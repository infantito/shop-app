import * as React from 'react'

import type { Product } from '~typings/assets/data'

export type ProductItemProps = {
  item: Product
  handleSelect: () => void
  children: React.ReactNode
}
