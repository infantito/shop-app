import * as React from 'react'
import { View, Text, TextInput } from 'react-native'

import type { InputProps as Props } from '~typings/components'
import { REGEX } from '~constants'
import inputStyles from './input.styles'

const Input = (props: Props) => {
  const {
    initialValue,
    initiallyValid,
    onInputChange,
    id,
    required,
    email,
    min,
    max,
    minLength,
    label,
    errorText,
    ...rest
  } = props

  const [state, setState] = React.useState({
    value: initialValue ?? '',
    isValid: initiallyValid,
    touched: false,
  })

  const updater = (newState: Partial<typeof state>) => {
    setState(prevState => ({ ...prevState, ...newState }))
  }

  const { value, isValid, touched } = state

  React.useEffect(() => {
    if (touched) {
      onInputChange(id, value, isValid)
    }
  }, [id, onInputChange, state])

  const handleChange = (text: string) => {
    let isValid = true

    if (required && text.trim().length === 0) {
      isValid = false
    }
    if (email && !REGEX.email.test(text.toLowerCase())) {
      isValid = false
    }
    if (min != null && +text < min) {
      isValid = false
    }
    if (max != null && +text > max) {
      isValid = false
    }
    if (minLength != null && text.length < minLength) {
      isValid = false
    }

    updater({ value: text, isValid, touched: true })
  }

  const handleBlur = () => {
    if (!touched) {
      updater({ touched: true })
    }
  }

  return (
    <View style={inputStyles.formControl}>
      <Text style={inputStyles.label}>{label}</Text>
      <TextInput {...rest} style={inputStyles.input} value={value} onChangeText={handleChange} onBlur={handleBlur} />
      {!isValid && touched && (
        <View style={inputStyles.errorContainer}>
          <Text style={inputStyles.errorText}>{errorText}</Text>
        </View>
      )}
    </View>
  )
}

export default Input
