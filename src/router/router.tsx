import * as React from 'react'
import { useSelector } from 'react-redux'

import type { RootState } from '~typings/store'
import type { RouterProps as Props } from '~typings/router'
import { Home } from '~screens'
import { Routes } from '~constants'
import { AuthNavigator, RootStack, ShopNavigator } from './navigators'

const Router = (props: Props) => {
  const [token, isProcessing] = useSelector(({ auth }: RootState) => [auth.token, auth.isProcessing])

  if (isProcessing) {
    return (
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name={Routes.HOME} component={Home} />
      </RootStack.Navigator>
    )
  }

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {token ? (
        <RootStack.Screen name={Routes.SHOP} component={ShopNavigator} />
      ) : (
        <RootStack.Screen name={Routes.AUTH} component={AuthNavigator} />
      )}
    </RootStack.Navigator>
  )
}

export default Router
