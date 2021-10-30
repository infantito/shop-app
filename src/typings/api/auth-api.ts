import type { User } from '~typings/assets/data'
import type { UserCredentials } from '~typings/store'

export type SignInRequest = UserCredentials

export type SignInResponse = {
  accessToken: string
  user: User
}
