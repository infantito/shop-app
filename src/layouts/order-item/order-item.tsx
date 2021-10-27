import * as React from 'react'
import { View, Text, Button } from 'react-native'

import type { OrderItemProps as Props } from '~typings/layouts'
import { CartItem } from '~layouts'
import { Card } from '~components'
import { COLORS } from '~constants'
import orderItemStyles from './order-item.styles'

const OrderItem = (props: Props) => {
  const [showDetails, setShowDetails] = React.useState(false)

  const handleShownDetails = () => {
    setShowDetails(prevState => !prevState)
  }

  const { items, date } = props

  const amount = React.useMemo(() => items.reduce((sum, { item }) => sum + item.price * item.quantity, 0), [])

  return (
    <Card style={orderItemStyles.orderItem}>
      <View style={orderItemStyles.summary}>
        <Text style={orderItemStyles.totalAmount}>${amount.toFixed(2)}</Text>
        <Text style={orderItemStyles.date}>{new Date(date).toDateString()}</Text>
      </View>
      <Button
        color={COLORS.primary}
        title={showDetails ? 'Hide Details' : 'Show Details'}
        onPress={handleShownDetails}
      />
      {showDetails && (
        <View style={orderItemStyles.detailItems}>
          {items.map(cartItem => (
            <CartItem key={cartItem.id} item={cartItem.item} />
          ))}
        </View>
      )}
    </Card>
  )
}

export default OrderItem
