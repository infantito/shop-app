import type { TextInputProps } from 'react-native'

export type InputProps = {
  id: string
  initialValue?: string
  initiallyValid?: boolean
  required?: boolean
  email?: boolean
  min?: number
  max?: number
  minLength?: number
  label: string
  errorText?: string
  onInputChange: (inputIdentifier: string, inputValue: string, inputValidity: boolean) => void
} & TextInputProps
