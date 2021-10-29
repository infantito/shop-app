import * as React from 'react'
import { Alert, LogBox } from 'react-native'
import { registerRootComponent } from 'expo'
import AppLoading from 'expo-app-loading'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'

import store from '~store'
import Router from '~router'
import { fetchFonts } from '~utils'

const App = () => {
  const [state, setState] = React.useState({
    isFontLoaded: false,
  })

  const updater = (newState: Partial<typeof state>) => {
    setState(prevState => ({ ...prevState, ...newState }))
  }

  const { isFontLoaded } = state

  if (!isFontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => updater({ isFontLoaded: true })}
        onError={error => Alert.alert('Error', JSON.stringify(error))}
      />
    )
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </Provider>
  )
}

/**
 * @description Ignore the following logs
 */
LogBox.ignoreLogs(['Remote debugger'])

export default registerRootComponent(App)
