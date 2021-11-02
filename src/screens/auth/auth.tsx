import * as React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { View, Alert, KeyboardAvoidingView, ScrollView, ActivityIndicator, Button } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import type { RootState } from '~typings/store'
import type { AuthProps as Props } from '~typings/screens'
import { signIn, signUp } from '~store'
import { Card, Input } from '~components'
import { Colors } from '~constants'
import authStyles from './auth.styles'

const Auth = (props: Props) => {
  const { status } = useSelector((state: RootState) => state.auth)

  const isAuthenticating = status === 'authenticating'

  const dispatch = useDispatch()

  const [state, setState] = React.useState({
    isSignUp: false,
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
  })

  const updater = React.useMemo(
    () => (newState: Partial<typeof state>) => {
      setState(prevState => ({
        ...prevState,
        ...newState,
        inputValues: { ...prevState.inputValues, ...newState.inputValues },
        inputValidities: { ...prevState.inputValidities, ...newState.inputValidities },
      }))
    },
    []
  )

  const { inputValues } = state

  React.useEffect(() => {
    if (status === 'error') {
      Alert.alert('An error ocurred!', '500', [{ text: 'Okay' }])
    }
  }, [status])

  const handleAuth = async () => {
    const isFormValid = Object.values(state.inputValidities).every(Boolean)

    if (!isFormValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [{ text: 'Okay' }])

      return
    }

    if (state.isSignUp) {
      dispatch(signUp({ email: inputValues.email, password: inputValues.password }))
    } else {
      dispatch(signIn({ email: inputValues.email, password: inputValues.password }))
    }
  }

  const handleInputChange = React.useCallback(
    (inputIdentifier: string, inputValue: string, inputValidity: boolean) => {
      updater({
        inputValues: {
          [inputIdentifier]: inputValue,
        } as typeof state.inputValues,
        inputValidities: {
          [inputIdentifier]: Boolean(inputValidity),
        } as typeof state.inputValidities,
      })
    },
    [updater]
  )

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
              {isAuthenticating ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Button title={state.isSignUp ? 'Sign Up' : 'Sign in'} color={Colors.primary} onPress={handleAuth} />
              )}
            </View>
            <View style={authStyles.buttonContainer}>
              <Button
                title={`Switch to ${state.isSignUp ? 'Sign in' : 'Sign Up'}`}
                color={Colors.accent}
                onPress={() => {
                  updater({ isSignUp: !state.isSignUp })
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
