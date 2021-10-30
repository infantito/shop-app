import type { User } from '~typings/assets/data'
import store from '~store'

export type RootState = ReturnType<typeof store['getState']>

export type AppDispatch = typeof store['dispatch']

export type UserCredentials = Pick<User, 'email' | 'password'>

export type UserAuth = {
  user: User
  token: string
  expiresIn: number
}
