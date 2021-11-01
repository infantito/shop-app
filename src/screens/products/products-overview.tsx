import * as React from 'react'
import { View, Text, FlatList, Button, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { DrawerActions } from '@react-navigation/routers'

import type { Product } from '~typings/assets/data'
import type { RootState } from '~typings/store'
import type { ProductsProps as Props } from '~typings/screens'
import { addProduct, fetchProducts } from '~store'
import { Colors, isAndroid, Routes } from '~constants'
import { ProductItem } from '~layouts'
import { HeaderButton } from '~components'
import { productsOverviewStyles } from './products.styles'

const ProductsOverview = (props: Props) => {
  const { navigation } = props

  const [token, { status, availableProducts: products }] = useSelector(
    ({ auth, product }: RootState) => [auth.token, product] as const
  )

  const isFetching = status === 'fetching'

  const isRefreshing = status === 'refreshing'

  const dispatch = useDispatch()

  const loadProducts = React.useCallback(
    async (newStatus: typeof status) => {
      dispatch(fetchProducts({ token, status: newStatus }))
    },
    [dispatch, token]
  )

  React.useEffect(() => {
    // const focuser = navigation.addListener('focus', loadProducts.bind(null, 'refreshing'))
    console.log('focus')
    return () => {
      // navigation.removeListener('focus', focuser)
    }
  }, [loadProducts])

  React.useEffect(() => {
    loadProducts('fetching')
  }, [])

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: 'All Products',
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName={isAndroid ? 'md-menu' : 'ios-menu'}
            onPress={() => {
              navigation.dispatch(DrawerActions.toggleDrawer())
            }}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Cart"
            iconName={isAndroid ? 'md-cart' : 'ios-cart'}
            onPress={() => {
              navigation.navigate(Routes.CART)
            }}
          />
        </HeaderButtons>
      ),
    })
  }, [navigation])

  const handleSelectItem = (product: Product) => {
    navigation.navigate(Routes.PRODUCT_DETAIL, {
      product,
    })
  }

  const handleAddToCart = (product: Product) => {
    dispatch(addProduct(product))
  }

  if (status === 'error') {
    return (
      <View style={productsOverviewStyles.centered}>
        <Text>An error occurred!</Text>
        <Button title="Try again" onPress={() => loadProducts('fetching')} color={Colors.primary} />
      </View>
    )
  }

  if (isFetching) {
    return (
      <View style={productsOverviewStyles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    )
  }

  if (!isFetching && products.length === 0) {
    return (
      <View style={productsOverviewStyles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    )
  }

  return (
    <FlatList
      onRefresh={() => loadProducts('refreshing')}
      refreshing={isRefreshing}
      data={products}
      keyExtractor={item => item.id.toString()}
      renderItem={itemData => (
        <ProductItem item={itemData.item} handleSelect={() => handleSelectItem(itemData.item)}>
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              handleSelectItem(itemData.item)
            }}
          />
          <Button color={Colors.primary} title="To Cart" onPress={() => handleAddToCart(itemData.item)} />
        </ProductItem>
      )}
    />
  )
}

export default ProductsOverview
