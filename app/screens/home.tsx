import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuth } from '../context/auth-context'
import Button from '../components/ui/button'

const HomeScreen = () => {
    const { authState, onLogout} = useAuth()
  return (
    <View>
          <Text>HomeScreen</Text>
          <Button action={onLogout} label='Logout' />
    </View>
  )
}

export default HomeScreen
