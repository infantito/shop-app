import type { CartProduct } from '~typings/assets/data'

export type CartItemProps = {
  item: CartProduct
  deletable?: boolean
  handleRemove?: () => void
}
