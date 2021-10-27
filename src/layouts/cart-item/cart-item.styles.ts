import { StyleSheet } from 'react-native'

const cartItemStyles = StyleSheet.create({
  cartItem: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    padding: 12,
  },
  itemData: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  quantity: {
    color: '#888',
    fontFamily: 'open-sans',
    fontSize: 16,
  },
  mainText: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20,
  },
})

export default cartItemStyles
