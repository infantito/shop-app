import type { ScreenProps } from '~typings/router'
import { Routes } from '~constants'
import { CompositeScreenProps } from '@react-navigation/core'

export type AuthProps = CompositeScreenProps<ScreenProps<Routes.AUTH>, ScreenProps<Routes.SHOP>>
