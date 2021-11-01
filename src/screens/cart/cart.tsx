import * as React from 'react'
import { View, Text, FlatList, Button, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import type { RootState } from '~typings/store'
import type { CartProps as Props } from '~typings/screens'
import { createOrder, removeFromCart } from '~store'
import { CartItem } from '~layouts'
import { Card } from '~components'
import { Colors } from '~constants'
import cartStyles from './cart.styles'

const Cart = (props: Props) => {
  const { navigation } = props

  const { token, user, cartTotalAmount, cartItems, status } = useSelector((state: RootState) => {
    const { cart } = state

    const cartItemValues = Object.values(cart.items)

    const cartItems = cartItemValues.sort((a, b) => (a.id > b.id ? 1 : -1))

    return {
      cartTotalAmount: cart.totalAmount,
      cartItems,
      status: state.order.status,
      token: state.auth.token,
      user: state.auth.user,
    }
  })

  const isSavingOrder = status === 'creating'

  const dispatch = useDispatch()

  const handleSaveOrder = async () => {
    dispatch(createOrder({ token, userId: user.id, items: cartItems }))
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
        {isSavingOrder ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
          <Button color={Colors.accent} title="Order Now" disabled={cartItems.length === 0} onPress={handleSaveOrder} />
        )}
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        renderItem={itemData => (
          <CartItem
            item={itemData.item}
            deletable
            handleRemove={() => {
              dispatch(removeFromCart(itemData.item))
            }}
          />
        )}
      />
    </View>
  )
}

export default Cart
