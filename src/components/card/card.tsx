import * as React from 'react'
import { View } from 'react-native'

import type { CardProps as Props } from '~typings/components'
import cardStyles from './card.styles'

const Card = (props: Props) => {
  const { style, children } = props

  return <View style={[cardStyles.card, style]}>{children}</View>
}

export default Card
