import * as React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { View, Alert, KeyboardAvoidingView, ScrollView, ActivityIndicator, Button } from 'react-native'
import { useDispatch } from 'react-redux'

import type { AuthProps as Props } from '~typings/screens'
import { Card, Input } from '~components'
import { Colors, Routes } from '~constants'
import authStyles from './auth.styles'
import { signIn } from '~store/auth-slice'

const Auth = (props: Props) => {
  const { navigation } = props

  const dispatch = useDispatch()

  const [state, setState] = React.useState({
    isProcessing: false,
    error: null as string,
    isAuthenticated: false,
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
  })

  const updater = (newState: Partial<typeof state>) => {
    setState(prevState => ({
      ...prevState,
      ...newState,
      inputValues: { ...prevState.inputValues, ...newState.inputValues },
      inputValidities: { ...prevState.inputValidities, ...newState.inputValidities },
    }))
  }

  const { inputValues } = state

  React.useEffect(() => {
    if (state.error) {
      Alert.alert('An error ocurred!', state.error, [{ text: 'Okay' }])
    }
  }, [state.error])

  const handleAuth = async () => {
    const isFormValid = Object.values(state.inputValidities).every(Boolean)

    if (!isFormValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [{ text: 'Okay' }])

      return
    }

    updater({ isProcessing: true, error: null })

    if (state.isAuthenticated) {
      console.log('dispatch: sign-up')
    } else {
      console.log('dispatch: sign-in')
    }

    try {
      console.log('await dispatch action - authenticated')

      dispatch(signIn({ username: inputValues.email, password: inputValues.password }))
    } catch (caughtError: InstanceType<Error>) {
      updater({ error: caughtError.message, isProcessing: false })
    }
  }

  const handleInputChange = (inputIdentifier: string, inputValue: string, inputValidity: boolean) => {
    updater({
      inputValues: {
        [inputIdentifier]: inputValue,
      } as typeof state.inputValues,
      inputValidities: {
        [inputIdentifier]: Boolean(inputValidity),
      } as typeof state.inputValidities,
    })
  }

  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50} style={authStyles.screen}>
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={authStyles.gradient}>
        <Card style={authStyles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={handleInputChange}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={handleInputChange}
              initialValue=""
            />
            <View style={authStyles.buttonContainer}>
              {state.isProcessing ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Button
                  title={state.isAuthenticated ? 'Sign Up' : 'Sign in'}
                  color={Colors.primary}
                  onPress={handleAuth}
                />
              )}
            </View>
            <View style={authStyles.buttonContainer}>
              <Button
                title={`Switch to ${state.isAuthenticated ? 'Sign in' : 'Sign Up'}`}
                color={Colors.accent}
                onPress={() => {
                  updater({ isAuthenticated: !state.isAuthenticated })
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  )
}

export default Auth
