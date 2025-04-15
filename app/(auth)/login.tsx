import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const login = () => {
  return (
    <View>
      <Text>login</Text>
      <Link href="/(auth)/signup">Signup</Link>
    </View>
  )
}

export default login