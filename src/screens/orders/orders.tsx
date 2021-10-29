import * as React from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import { DrawerActions } from '@react-navigation/routers'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch, useSelector } from 'react-redux'

import type { RootState } from '~typings/store'
import type { OrdersProps as Props } from '~typings/screens'
import { OrderItem } from '~layouts'
import { HeaderButton } from '~components'
import { Colors, isAndroid } from '~constants'
import orderStyles from './orders.styles'

const Orders = (props: Props) => {
  const { navigation } = props

  const [isLoading, setIsLoading] = React.useState(false)

  const orders = useSelector((state: RootState) => state.order.orders)

  const dispatch = useDispatch()

  React.useEffect(() => {
    setIsLoading(true)

    console.log(`dispatch - getOrders`)
  }, [dispatch])

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

  if (isLoading) {
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
      data={orders}
      keyExtractor={item => item.id}
      renderItem={itemData => <OrderItem date={itemData.item.date} items={itemData.item.items} />}
    />
  )
}

export default Orders
