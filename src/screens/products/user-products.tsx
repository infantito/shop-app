import * as React from 'react'
import { Alert, Button, FlatList, Text, View } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { DrawerActions } from '@react-navigation/routers'
import { useDispatch, useSelector } from 'react-redux'

import type { Product } from '~typings/assets/data'
import { ProductStatus } from '~typings/api'
import type { RootState } from '~typings/store'
import type { ProductsProps as Props } from '~typings/screens'
import { deleteProduct, fetchUserProducts } from '~store'
import { ProductItem } from '~layouts'
import { HeaderButton } from '~components'
import { Colors, isAndroid, Routes } from '~constants'
import { userProductsStyles } from './products.styles'

const UserProducts = (props: Props) => {
  const { navigation } = props

  const { userProducts, token, user, status } = useSelector(({ product, auth }: RootState) => ({
    userProducts: product.userProducts,
    token: auth.token,
    user: auth.user,
    status: product.status,
  }))

  const dispatch = useDispatch()

  const handleEdit = (product: Product) => {
    navigation.navigate(Routes.UPDATE_PRODUCT, { productId: product.id })
  }

  const handleDelete = (id: Product['id']) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(deleteProduct({ token, productId: id }))
        },
      },
    ])
  }

  const loadProducts = async (newStatus: ProductStatus) => {
    dispatch(fetchUserProducts({ token, status: newStatus, userId: user.id }))
  }

  React.useEffect(() => {
    loadProducts('fetching')
  }, [])

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Your Products',
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
            title="Add"
            iconName={isAndroid ? 'md-create' : 'ios-create'}
            onPress={() => {
              navigation.navigate(Routes.UPDATE_PRODUCT)
            }}
          />
        </HeaderButtons>
      ),
    })
  }, [navigation])

  if (userProducts.length === 0) {
    return (
      <View style={userProductsStyles.empty}>
        <Text>No products found, maybe start creating some?</Text>
      </View>
    )
  }

  return (
    <FlatList
      onRefresh={() => loadProducts('refreshing')}
      refreshing={status === 'refreshing'}
      data={userProducts}
      keyExtractor={item => item.id.toString()}
      renderItem={itemData => (
        <ProductItem item={itemData.item} handleSelect={handleEdit.bind(this, itemData.item)}>
          <Button color={Colors.primary} title="Edit" onPress={handleEdit.bind(this, itemData.item)} />
          <Button color={Colors.primary} title="Delete" onPress={handleDelete.bind(this, itemData.item.id)} />
        </ProductItem>
      )}
    />
  )
}

export default UserProducts
