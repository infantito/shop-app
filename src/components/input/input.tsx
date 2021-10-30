import * as React from 'react'
import { View, Text, TextInput } from 'react-native'

import type { InputProps as Props } from '~typings/components'
import { Regex } from '~constants'
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
    isValid: initiallyValid ?? false,
    touched: false,
  })

  const updater = (newState: Partial<typeof state>) => {
    setState(prevState => ({ ...prevState, ...newState }))
  }

  const { value, isValid, touched } = state

  const handleChange = (text: string) => {
    let isValid = true

    if (required && text.trim().length === 0) {
      isValid = false
    }
    if (email && !Regex.email.test(text.toLowerCase())) {
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

  React.useEffect(() => {
    if (state.touched) {
      onInputChange(id, value, isValid)
    }
  }, [state, onInputChange, id])

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
