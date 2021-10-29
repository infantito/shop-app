import { StyleSheet } from 'react-native'

const productDetailStyles = StyleSheet.create({
  image: {
    height: 300,
    width: '100%',
  },
  actions: {
    alignItems: 'center',
    marginVertical: 12,
  },
  price: {
    color: '#888',
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    marginVertical: 20,
    textAlign: 'center',
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: 14,
    marginHorizontal: 20,
    textAlign: 'center',
  },
})

export default productDetailStyles
