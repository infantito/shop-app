import { StyleSheet } from 'react-native'
import { Colors } from '~constants'

const cartStyles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 12,
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
})

export default cartStyles
