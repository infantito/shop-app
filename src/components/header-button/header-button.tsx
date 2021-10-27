import * as React from 'react'
import { HeaderButton as ReactNavigationHeaderButtons, HeaderButtonProps } from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'

import { COLORS, isAndroid } from '~constants'

const HeaderButton = (props: HeaderButtonProps) => {
  return (
    <ReactNavigationHeaderButtons
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={isAndroid ? 'white' : COLORS.primary}
    />
  )
}

export default HeaderButton
