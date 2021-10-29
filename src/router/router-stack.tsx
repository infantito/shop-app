import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Auth, Cart, Orders, ProductDetail, Products, UpdateProduct } from '~screens'
import { Routes, StackNavigationOptions } from '~constants'

export const RootStack = createStackNavigator()

export const ProductStack = createStackNavigator()

export const OrdersStack = createStackNavigator()

export const AdminStack = createStackNavigator()

export const AuthStack = createStackNavigator()

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
  <AdminStack.Navigator initialRouteName={Routes.USER_PRODUCTS}>
    <AdminStack.Screen name={Routes.USER_PRODUCTS} component={Products} options={StackNavigationOptions} />
    <AdminStack.Screen name={Routes.UPDATE_PRODUCT} component={UpdateProduct} options={StackNavigationOptions} />
  </AdminStack.Navigator>
)

export const AuthNavigator = () => (
  <AuthStack.Navigator initialRouteName={Routes.RECOGNITION} screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name={Routes.RECOGNITION} component={Auth} options={StackNavigationOptions} />
  </AuthStack.Navigator>
)
