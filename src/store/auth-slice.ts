import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'

import type { User } from '~typings/assets/data'
import type { SystemStatus, UserAuth, UserCredentials } from '~typings/store'
import { StorageKey } from '~constants'
import { AuthAPI } from '~api'

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
  status: 'booting-up' as SystemStatus,
}

export const signIn = createAsyncThunk('signIn', async (credentials: UserCredentials, thunkAPI) => {
  const json = await AuthAPI.signIn(credentials)

  const now = new Date()

  const expireDate = new Date(now.setHours(now.getHours() + 8))

  const result: UserAuth = {
    token: json.accessToken,
    user: json.user,
    expiresIn: expireDate.getTime(),
  }

  if (result.token && result.user) {
    await AsyncStorage.setItem(StorageKey.AUTH, JSON.stringify(result))
  }

  return result
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    [AuthAction.START_UP]: () => {
      return { ...initialState, status: null }
    },
    [AuthAction.AUTHENTICATE]: (state, action: PayloadAction<UserAuth>) => {
      return { ...state, ...action.payload, status: null }
    },
    [AuthAction.SIGN_OUT]: () => {
      AsyncStorage.clear()

      return { ...initialState, status: null }
    },
    [AuthAction.SIGN_UP]: (state, action: PayloadAction<UserCredentials>) => {
      const { email, password } = action.payload

      const userId = `${email}-${password}`

      return {
        ...state,
        status: null,
        token: window.btoa(userId),
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      const { token, expiresIn, user } = action.payload

      state.status = null

      state.token = token

      state.user = user

      state.expiresIn = expiresIn
    })

    builder.addCase(signIn.pending, (state, action) => {
      state.status = 'authenticating'
    })

    builder.addCase(signIn.rejected, (state, action) => {
      state.status = 'authenticating'

      state.token = null

      state.expiresIn = 0

      state.user = null
    })
  },
})

export const { AUTHENTICATE: authenticate, START_UP: startUp, SIGN_OUT: signOut, SIGN_UP: signUp } = authSlice.actions

const authReducer = authSlice.reducer

export default authReducer
