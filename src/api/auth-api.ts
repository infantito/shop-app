import type { SignInRequest, SignInResponse } from '~typings/api'
import { API } from '~constants'

const AuthAPI = {
  signIn: async (userCredentials: SignInRequest) => {
    try {
      const response = await fetch(API.SignIn, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCredentials),
      })

      const json: SignInResponse = await response.json()

      return json
    } catch (error) {
      return null
    }
  },
}

export default AuthAPI
