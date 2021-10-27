import type { User } from '~typings/assets/data'
import store from '~store'

export type RootState = ReturnType<typeof store['getState']>

export type AppDispatch = typeof store['dispatch']

export type UserCredentials = { expiresIn: number } & Pick<User, 'username' | 'password'>

export type SignInUser = Pick<User, 'username' | 'password'>

export type AuthenticateUser = Pick<UserCredentials, 'expiresIn'> & { user: User; token: string }
