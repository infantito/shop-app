import * as React from 'react'
import { Button, SafeAreaView } from 'react-native'
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'

import { signOut } from '~store'
import { Colors, DrawerNavigationOptions, isAndroid, Routes } from '~constants'
import { AdminNavigator, OrdersNavigator, ProductNavigator } from './router-stack'

export const ShopStack = createDrawerNavigator()

const DrawerContent = (props: DrawerContentComponentProps) => {
  const dispatch = useDispatch()

  return (
    <DrawerContentScrollView style={{ flex: 1, paddingTop: 20 }} {...props}>
      <SafeAreaView>
        <DrawerItemList {...props} />
        <Button
          title="Sign out"
          color={Colors.primary}
          onPress={() => {
            dispatch(signOut())
          }}
        />
      </SafeAreaView>
    </DrawerContentScrollView>
  )
}

export const ShopNavigator = () => (
  <ShopStack.Navigator
    initialRouteName={Routes.PRODUCTS}
    screenOptions={{ headerShown: false }}
    drawerContent={props => <DrawerContent {...props} />}
  >
    <ShopStack.Screen
      name={Routes.PRODUCTS}
      component={ProductNavigator}
      options={{
        ...DrawerNavigationOptions,
        drawerIcon: drawerConfig => (
          <Ionicons name={isAndroid ? 'md-cart' : 'ios-cart'} size={23} color={drawerConfig.color} />
        ),
        drawerLabel: 'Products',
      }}
    />
    <ShopStack.Screen
      name={Routes.ORDERS}
      component={OrdersNavigator}
      options={{
        ...DrawerNavigationOptions,
        drawerIcon: drawerConfig => (
          <Ionicons name={isAndroid ? 'md-list' : 'ios-list'} size={23} color={drawerConfig.color} />
        ),
        drawerLabel: 'Orders',
      }}
    />
    <ShopStack.Screen
      name={Routes.ADMIN}
      component={AdminNavigator}
      options={{
        ...DrawerNavigationOptions,
        drawerIcon: drawerConfig => (
          <Ionicons name={isAndroid ? 'md-create' : 'ios-create'} size={23} color={drawerConfig.color} />
        ),
        drawerLabel: 'Admin',
      }}
    />
  </ShopStack.Navigator>
)
