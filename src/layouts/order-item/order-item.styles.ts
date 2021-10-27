import { StyleSheet } from 'react-native'

const orderItemStyles = StyleSheet.create({
  orderItem: {
    alignItems: 'center',
    margin: 20,
    padding: 12,
  },
  summary: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    width: '100%',
  },
  totalAmount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  date: {
    color: '#888',
    fontSize: 16,
    fontFamily: 'open-sans',
  },
  detailItems: {
    width: '100%',
  },
})

export default orderItemStyles
