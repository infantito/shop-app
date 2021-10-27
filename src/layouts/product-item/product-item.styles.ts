import { StyleSheet } from 'react-native'

const productItemStyles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20,
  },
  touchable: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  imageContainer: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: '60%',
    overflow: 'hidden',
    width: '100%',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  details: {
    alignItems: 'center',
    height: '18%',
    padding: 12,
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    marginVertical: 2,
  },
  price: {
    color: '#888',
    fontFamily: 'open-sans',
    fontSize: 14,
  },
  actions: {
    alignItems: 'center',
    flexDirection: 'row',
    height: '23%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
})

export default productItemStyles
