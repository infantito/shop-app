import * as React from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import { DrawerActions } from '@react-navigation/routers'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch, useSelector } from 'react-redux'

import type { OrderStatus } from '~typings/api'
import type { RootState } from '~typings/store'
import type { OrdersProps as Props } from '~typings/screens'
import { getUserOrders } from '~store'
import { OrderItem } from '~layouts'
import { HeaderButton } from '~components'
import { Colors, isAndroid } from '~constants'
import orderStyles from './orders.styles'

const Orders = (props: Props) => {
  const { navigation } = props

  const { orders, token, userId, status } = useSelector(({ order, auth }: RootState) => {
    const userOrders = order.orders.filter(order => order.userId === auth.user.id)

    return {
      orders: userOrders,
      userId: auth.user.id,
      token: auth.token,
      status: order.status,
    }
  })

  const dispatch = useDispatch()

  const loadOrders = (newStatus: OrderStatus) => {
    dispatch(getUserOrders({ status: newStatus, token, userId }))
  }

  React.useEffect(() => {
    loadOrders('fetching')
  }, [])

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Your Orders',
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
    })
  }, [navigation])

  if (status === 'fetching') {
    return (
      <View style={orderStyles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    )
  }

  if (orders.length === 0) {
    return (
      <View style={orderStyles.empty}>
        <Text>No order found, maybe start ordering some products?</Text>
      </View>
    )
  }

  return (
    <FlatList
      onRefresh={() => loadOrders('refreshing')}
      refreshing={status === 'refreshing'}
      data={orders}
      keyExtractor={item => item.id.toString()}
      renderItem={itemData => <OrderItem date={itemData.item.date} items={itemData.item.items} />}
    />
  )
}

export default Orders
