import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'

import type { User, UserAuth } from '~typings/assets/data'
import type { AuthenticateUser, SignInUser, UserCredentials } from '~typings/store'
import { StorageKey } from '~constants'

export enum AuthAction {
  AUTHENTICATE = 'AUTHENTICATE',
  START_UP = 'START_UP',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  SIGN_UP = 'SIGN_UP',
}

const initialState = {
  token: null as string,
  user: null as User,
  expiresIn: 0,
  isProcessing: true,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    [AuthAction.START_UP]: () => {
      return { ...initialState, isProcessing: false }
    },
    [AuthAction.AUTHENTICATE]: (state, action: PayloadAction<AuthenticateUser>) => {
      const { expiresIn, user, token } = action.payload

      return { ...state, user, expiresIn, token, isProcessing: false }
    },
    [AuthAction.SIGN_IN]: (state, action: PayloadAction<SignInUser>) => {
      const { username, password } = action.payload

      const userId = `${username}-${password}`

      const now = new Date()

      const expireDate = new Date(now.setHours(now.getHours() + 8))

      const auth: UserAuth = {
        user: {
          id: userId,
          ...action.payload,
        },
        token: userId,
        expiresIn: expireDate.getTime(),
      }

      AsyncStorage.setItem(StorageKey.AUTH, JSON.stringify(auth))

      return {
        ...state,
        isProcessing: false,
        token: window.btoa(userId),
      }
    },
    [AuthAction.SIGN_OUT]: () => {
      AsyncStorage.clear()

      return { ...initialState, isProcessing: false }
    },
    [AuthAction.SIGN_UP]: (state, action: PayloadAction<UserCredentials>) => {
      const { username, password } = action.payload

      const userId = `${username}-${password}`

      return {
        ...state,
        isProcessing: false,
        token: window.btoa(userId),
      }
    },
  },
})

export const {
  AUTHENTICATE: authenticate,
  START_UP: startUp,
  SIGN_IN: signIn,
  SIGN_OUT: signOut,
  SIGN_UP: signUp,
} = authSlice.actions

const authReducer = authSlice.reducer

export default authReducer
