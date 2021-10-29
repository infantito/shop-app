import * as React from 'react'
import { Button, SafeAreaView } from 'react-native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { Ionicons } from '@expo/vector-icons'

import { Auth, Cart, Orders, ProductDetail, Products, UpdateProduct } from '~screens'
import { Colors, DrawerNavigationOptions, isAndroid, Routes, StackNavigationOptions } from '~constants'

export const RootStack = createStackNavigator()

export const ProductStack = createStackNavigator()

export const OrdersStack = createStackNavigator()

export const AdminStack = createStackNavigator()

export const AuthStack = createStackNavigator()

export const ShopStack = createDrawerNavigator()

export const ProductNavigator = () => (
  <ProductStack.Navigator initialRouteName={Routes.PRODUCTS_OVERVIEW}>
    <ProductStack.Screen name={Routes.PRODUCTS_OVERVIEW} component={Products} options={StackNavigationOptions} />
    <ProductStack.Screen name={Routes.PRODUCT_DETAIL} component={ProductDetail} options={StackNavigationOptions} />
    <ProductStack.Screen name={Routes.CART} component={Cart} options={StackNavigationOptions} />
  </ProductStack.Navigator>
)

export const OrdersNavigator = () => (
  <OrdersStack.Navigator initialRouteName={Routes.ORDERS_OVERVIEW}>
    <OrdersStack.Screen name={Routes.ORDERS_OVERVIEW} component={Orders} options={StackNavigationOptions} />
  </OrdersStack.Navigator>
)

export const AdminNavigator = () => (
  <AdminStack.Navigator>
    <AdminStack.Screen name={Routes.USER_PRODUCTS} component={Products} options={StackNavigationOptions} />
    <AdminStack.Screen name={Routes.UPDATE_PRODUCT} component={UpdateProduct} options={StackNavigationOptions} />
  </AdminStack.Navigator>
)

export const ShopNavigator = () => (
  <ShopStack.Navigator
    initialRouteName={Routes.PRODUCTS}
    screenOptions={{ headerShown: false }}
    drawerContent={props => {
      return (
        <DrawerContentScrollView style={{ flex: 1, paddingTop: 20 }} {...props}>
          <SafeAreaView>
            <DrawerItemList {...props} />
            <Button
              title="Sign out"
              color={Colors.primary}
              onPress={() => {
                console.log('dispatch: sign out')
              }}
            />
          </SafeAreaView>
        </DrawerContentScrollView>
      )
    }}
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

export const AuthNavigator = () => (
  <AuthStack.Navigator initialRouteName={Routes.RECOGNITION} screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name={Routes.RECOGNITION} component={Auth} options={StackNavigationOptions} />
  </AuthStack.Navigator>
)
