import React from 'react'
import { View, Text, TouchableOpacity, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import type { CartItemProps } from '~typings/layouts'
import { isAndroid } from '~constants'
import cartItemStyles from './cart-item.styles'

const CartItem = (props: CartItemProps) => {
  const { item, deletable, handleRemove } = props

  const amount = item.price * item.quantity

  return (
    <View style={cartItemStyles.cartItem}>
      <View style={cartItemStyles.itemData}>
        <Text style={cartItemStyles.quantity}>{item.quantity} </Text>
        <Text style={cartItemStyles.mainText}>{item.title}</Text>
      </View>
      <View style={cartItemStyles.itemData}>
        <Text style={cartItemStyles.mainText}>${amount.toFixed(2)}</Text>
        {deletable && (
          <TouchableOpacity onPress={handleRemove} style={cartItemStyles.deleteButton}>
            <Ionicons name={isAndroid ? 'md-trash' : 'ios-trash'} size={24} color="red" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default CartItem
