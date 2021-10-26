import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { registerRootComponent } from 'expo'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

function App() {
  return (
    <View style={styles.container}>
      <Text>Open up app.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  )
}

export default registerRootComponent(App)
