import { StyleSheet } from 'react-native'

const inputStyles = StyleSheet.create({
  formControl: {
    width: '100%',
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8,
  },
  input: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingHorizontal: 2,
    paddingVertical: 6,
  },
  errorContainer: {
    marginVertical: 6,
  },
  errorText: {
    color: 'red',
    fontFamily: 'open-sans',
    fontSize: 13,
  },
})

export default inputStyles
