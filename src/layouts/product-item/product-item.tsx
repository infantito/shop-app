import * as React from 'react'
import { View, Text, Image, Pressable } from 'react-native'

import type { ProductItemProps } from '~typings/layouts'
import { Card } from '~components'
import productItemStyles from './product-item.styles'

const ProductItem = (props: ProductItemProps) => {
  const { item, children, handleSelect } = props

  return (
    <Card style={productItemStyles.product}>
      <Pressable style={productItemStyles.touchable} onPress={handleSelect}>
        <View>
          <View style={productItemStyles.imageContainer}>
            <Image style={productItemStyles.image} source={{ uri: item.imageUrl }} />
          </View>
          <View style={productItemStyles.details}>
            <Text style={productItemStyles.title}>{item.title}</Text>
            <Text style={productItemStyles.price}>${item.price.toFixed(2)}</Text>
          </View>
          <View style={productItemStyles.actions}>{children}</View>
        </View>
      </Pressable>
    </Card>
  )
}

export default ProductItem
