import type { DrawerNavigationOptions as DrawerOptions } from '@react-navigation/drawer'
import type { StackNavigationOptions as StackOptions } from '@react-navigation/stack'

import Colors from './colors'
import { isAndroid } from './common'

const StackNavigationOptions: StackOptions = {
  headerStyle: {
    backgroundColor: isAndroid ? Colors.primary : '',
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
  headerTintColor: isAndroid ? 'white' : Colors.primary,
}

const DrawerNavigationOptions: DrawerOptions = {
  drawerActiveTintColor: Colors.primary,
  drawerLabelStyle: {
    fontFamily: 'open-sans-bold',
  },
}

export { StackNavigationOptions, DrawerNavigationOptions }
