import * as React from 'react'
import { useNavigation } from '@react-navigation/core'
import { useSelector } from 'react-redux'

import type { RootState } from '~typings/store'
import type { RootStackParamList, RouterProps as Props } from '~typings/router'
import { Home } from '~screens'
import { Routes } from '~constants'
import { AuthNavigator, RootStack } from './router-stack'
import { ShopNavigator } from './router-drawer'

const Router = (props: Props) => {
  const [token, status] = useSelector(({ auth }: RootState) => [auth.token, auth.status] as const)

  const navigation = useNavigation<RootStackParamList<Routes.AUTH>>()

  const isBootingUp = status === 'booting-up'

  if (isBootingUp) {
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
