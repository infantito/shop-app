import React, { useState } from 'react'
import { View, Text, FlatList, Button, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import type { RootState } from '~typings/store'
import type { CartProps as Props } from '~typings/screens'
import { Colors } from '~constants'
import { Card } from '~components'
import cartStyles from './cart.styles'
import { CartItem } from '~layouts'

const Cart = (props: Props) => {
  const { navigation } = props

  const [isLoading, setIsLoading] = useState(false)

  const { cartTotalAmount, cartItems } = useSelector((state: RootState) => {
    const { cart } = state

    const cartItemValues = Object.values(cart.items)

    const cartItems = cartItemValues.sort((a, b) => (a.id > b.id ? 1 : -1))

    return {
      cartTotalAmount: cart.totalAmount,
      cartItems,
    }
  })

  const dispatch = useDispatch()

  const sendOrderHandler = async () => {
    setIsLoading(true)

    console.log('sendOrderHandler')
  }

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Your Cart',
    })
  }, [navigation])

  return (
    <View style={cartStyles.screen}>
      <Card style={cartStyles.summary}>
        <Text style={cartStyles.summaryText}>
          Total: <Text style={cartStyles.amount}>${Math.round(Number(cartTotalAmount.toFixed(2)) * 100) / 100}</Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
          <Button
            color={Colors.accent}
            title="Order Now"
            disabled={cartItems.length === 0}
            onPress={sendOrderHandler}
          />
        )}
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id}
        renderItem={itemData => (
          <CartItem
            item={itemData.item}
            deletable
            handleRemove={() => {
              console.log('handleRemove: dispatch(removeFromCart)')
            }}
          />
        )}
      />
    </View>
  )
}

export default Cart
