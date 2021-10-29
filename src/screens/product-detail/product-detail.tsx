import * as React from 'react'
import { Button, Image, ScrollView, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import type { RootState } from '~typings/store'
import type { ProductDetailProps as Props } from '~typings/screens'
import { Colors } from '~constants'
import productDetailStyles from './product-detail.styles'

const ProductDetail = (props: Props) => {
  const { route, navigation } = props

  const { product } = route.params

  const selectedProduct = useSelector((state: RootState) =>
    state.product.availableProducts.find(item => item.id === product.id)
  )

  const dispatch = useDispatch()

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: product.title,
    })
  }, [navigation])

  return (
    <ScrollView>
      <Image style={productDetailStyles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={productDetailStyles.actions}>
        <Button
          color={Colors.primary}
          title="Add to Cart"
          onPress={() => {
            console.log('Add to cart pressed')
          }}
        />
      </View>
      <Text style={productDetailStyles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={productDetailStyles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  )
}

export default ProductDetail
