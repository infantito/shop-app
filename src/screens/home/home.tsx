import * as React from 'react'
import { ActivityIndicator, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'

import type { UserAuth } from '~typings/assets/data'
import type { HomeProps } from '~typings/screens'
import { authenticate, signIn, startUp } from '~store'
import { Colors, StorageKey } from '~constants'
import homeStyles from './home.styles'

const Home = (props: HomeProps) => {
  const { navigation } = props

  const dispatch = useDispatch()

  React.useEffect(() => {
    const handleSignIn = async () => {
      const userData = await AsyncStorage.getItem(StorageKey.AUTH)

      if (!userData) {
        dispatch(startUp())

        return
      }

      const transformedData = JSON.parse(userData) as UserAuth

      const { token, user, expiresIn } = transformedData

      const userId = user.id

      const expirationDate = new Date(expiresIn)

      if (expirationDate <= new Date() || !token || !userId) {
        dispatch(startUp())

        return
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime()

      dispatch(authenticate({ expiresIn: expirationTime, user, token }))
    }

    handleSignIn()
  }, [dispatch])

  return (
    <View style={homeStyles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  )
}

export default Home
