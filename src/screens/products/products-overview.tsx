import * as React from 'react'
import { View, Text, FlatList, Button, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { DrawerActions } from '@react-navigation/routers'

import type { Product } from '~typings/assets/data'
import type { RootState } from '~typings/store'
import type { ProductsProps as Props } from '~typings/screens'
import { Colors, isAndroid, Routes } from '~constants'
import { ProductItem } from '~layouts'
import { HeaderButton } from '~components'
import { productsOverviewStyles } from './products.styles'

const ProductsOverview = (props: Props) => {
  const { navigation } = props

  const [state, setState] = React.useState({
    isLoading: true,
    isRefreshing: false,
    error: null as string,
  })

  const updater = (newState: Partial<typeof state>) => {
    setState(prevState => ({
      ...prevState,
      ...newState,
    }))
  }

  const products = useSelector(({ product }: RootState) => product.availableProducts)

  const dispatch = useDispatch()

  const loadProducts = React.useCallback(async () => {
    let error = null as typeof state['error']

    updater({ error, isRefreshing: true })

    try {
      console.log('await fetchProducts')
    } catch (caughtError: InstanceType<Error>) {
      error = caughtError.message
    }

    updater({ error, isRefreshing: false, isLoading: false })
  }, [dispatch, setState, state.error])

  React.useEffect(() => {
    const focuser = navigation.addListener('focus', loadProducts)
    console.log('focus')
    return () => {
      navigation.removeListener('focus', focuser)
    }
  }, [loadProducts])

  React.useEffect(() => {
    updater({ isLoading: true })

    loadProducts().then(() => {
      updater({ isLoading: false })
    })
  }, [dispatch, loadProducts])

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

  if (state.error) {
    return (
      <View style={productsOverviewStyles.centered}>
        <Text>An error occurred!</Text>
        <Button title="Try again" onPress={loadProducts} color={Colors.primary} />
      </View>
    )
  }

  if (state.isLoading) {
    return (
      <View style={productsOverviewStyles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    )
  }

  if (!state.isLoading && products.length === 0) {
    return (
      <View style={productsOverviewStyles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    )
  }

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={state.isRefreshing}
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem item={itemData.item} handleSelect={() => handleSelectItem(itemData.item)}>
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              handleSelectItem(itemData.item)
            }}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => {
              console.log('dispatch: addToCart')
            }}
          />
        </ProductItem>
      )}
    />
  )
}

export default ProductsOverview
